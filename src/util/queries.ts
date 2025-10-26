/** @format */

import { WOWS_BASE_URL, type shipClass, type shipData } from "./types";

// export function useGetShipPageQuery(pageNum = 1, type = "") {
//   return useQuery({
//     queryKey: ["ships" + pageNum],
//     queryFn: async () => GetShipPage(pageNum, type),
//   });

//   //
// }

export const GetShipPage = async ({
  pageParam,
  shipType,
}: {
  pageParam: number;
  shipType: shipClass | "";
}) => {
  const params = new URLSearchParams({
    application_id: import.meta.env.VITE_WOWS_API_KEY,
    fields: `
            price_gold,
            images.large,
            nation,
            tier,
            type,
            name,
            ship_id,
            is_premium,
            description,
            default_profile.mobility,
            default_profile.armour.health,
            default_profile.armour.total,
            default_profile.concealment,
            default_profile.weaponry`,
    limit: "15",
    page_no: `${pageParam}`, //needs to be variable
    type: shipType,
  });
  //filter variable})
  const res = await fetch(WOWS_BASE_URL + "/encyclopedia/ships/?" + params);
  const data = await res.json();

  if (data.status !== "error") {
    const dataArr = Object.values(data.data).map((item) => item as shipData);

    //On last page?
    if (data.meta.page >= data.meta.page_total) {
      return { data: dataArr, nextPage: pageParam + 1, hasMore: false };
    }

    return { data: dataArr, nextPage: pageParam + 1, hasMore: true };
  }

  throw new Error("ERROR");
};

// export async function GetShipPage(pageNum: number, type = "") {
//   console.log("Fetch page: ", pageNum);
//   const config: AxiosRequestConfig = {
//     method: "get",
//     maxBodyLength: Infinity,
//     baseURL: WOWS_BASE_URL,
//     url: "encyclopedia/ships/",
//     params: {
//       application_id: import.meta.env.VITE_WOWS_API_KEY,
//       fields: `
//             price_gold,
//             images.large,
//             nation,
//             tier,
//             type,
//             name,
//             ship_id,
//             is_premium,
//             description,
//             default_profile.mobility,
//             default_profile.armour.health,
//             default_profile.armour.total,
//             default_profile.concealment,
//             default_profile.weaponry`,
//       limit: 15,
//       page_no: pageNum, //needs to be variable
//       type: "", //filter variable
//     },
//   };

//   const response = await axios.request(config);
//   const data = response.data;

//   const dataArr = Object.values(data.data).map((item) => item as shipData);
//   return dataArr;
// }
