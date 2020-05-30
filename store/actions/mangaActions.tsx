import { SET_MANGA_LIST, IBook } from "../../types";
import { BASE_URL } from "react-native-dotenv";
import axios, { AxiosResponse } from "axios";
import moment from "moment";

export const fetchMangaList = () => {
  return async (dispatch: any, getState: any) => {
    // console.log("BASE_URL ", BASE_URL);

    // axios
    //   .get(`${BASE_URL}/list/0`)
    //   .then((res: any) => {
    //     dispatch({ type: SET_MANGA_LIST, books: res.data.manga });
    //     // console.log("RESULT ", res.data.manga);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // interface IData {
    //   data {
    //     manga: IBook[]
    //   }
    // }
    // console.log("BEFORE AXIOS CREATING");
    const newAxios = axios.create({});

    // interface IRes {
    //   res: {
    //     data: {
    //       manga: IBook;
    //     };
    //   };
    // }

    interface IKeys {
      i: string;
      a: string;
      c: [string];
      h: number;
      im?: string | null;
      s: number;
      t: string;
      ld: number | undefined;
    }

    newAxios.interceptors.response.use(
      (res) => {
        return res.data.manga.map(
          ({
            a: alias,
            c: categories,
            h: hits,
            i: _id,
            im: image,
            s: status,
            t: title,
            ld: last_chapter_date,
          }: IKeys) => ({
            _id,
            alias,
            categories,
            hits,
            image,
            status,
            title,
            last_chapter_date,
          })
        );
      },
      (err) => {
        console.log("Error in axios ", err.message);
        throw err;
      }
    );

    const mangas = await newAxios.get<any, IBook[]>(`${BASE_URL}/list/0`);

    if (mangas.length === 0) {
      throw new Error("Oops, no books found. Please try later.");
    }

    const mangasWithImages = mangas.filter((manga) => manga.image !== null);

    dispatch({ type: SET_MANGA_LIST, books: mangasWithImages });
  };
};
