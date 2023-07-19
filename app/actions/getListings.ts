import prisma from "../../app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  locationValue?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};
    if (userId) {
      query.userId = userId;
    }

    if(category){
        query.category= category
    }
    if(guestCount){
        query.roomCount ={
            gte:+guestCount
        };
    }
    if(bathroomCount){
        query.roomCount ={
            gte:+bathroomCount
        };
    }    if(roomCount){
        query.roomCount ={
            gte:+roomCount
        };
    }

    if(locationValue){
        query.locationValue = locationValue

    }
    if(startDate && endDate ){
        query.NOT = {
            reservation :{
                some:{
                    OR:[
                        {
                            endDate :{gte:startDate},
                            startDate:{lte:startDate}
                        },{
                        startDate:{lte:endDate},
                        endDate:{gte:endDate}
                        },
                    ]
                }
            }
        }
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createAt: listing.createAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
