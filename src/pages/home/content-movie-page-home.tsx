import { Col } from "antd";
import cls from "classnames";
import styles from "./home.module.scss";
import api from "../../apis/api";
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast

import { ToastContainer, toast } from "react-toastify";

interface ContentMovieProps {
  item: any[];
  titleMovie: string;
  currentIndex: number;
}

const ContentMoviePageHome = ({
  item,
  titleMovie,
  currentIndex,
}: ContentMovieProps) => {
  const handClickMovie = async () => {
    try {
      const response = await api.post(
        "/gh/tconns/demo-tdm/data_recommend.json",
        {
          // error api post
          titleMovie: titleMovie,
        }
      );

      console.log(response.data);

      toast(`Title Movie: ${titleMovie}`, {
        // toast đúng nếu api được
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Đã xảy ra lỗi.", {
        //chỉ toast được error
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      {item.map((item: any, index: number) => {
        return (
          <Col {...{ xs: 12, md: 8, xl: 6 }} key={index}>
            <div
              className={cls(
                "bg-[#202020] h-full rounded-xl overflow-hidden flex flex-col",
                styles["content-movie"],
                currentIndex === index && styles["content-movie-focus"]
              )}
              onClick={handClickMovie}
            >
              <img src={item.image} alt="images" className="w-full h-auto" />
              <div className="p-2 flex flex-col justify-between flex-1">
                <p className="font-medium text-base">{item.title}</p>
                <p className="font-light">{item.subtitle}</p>
              </div>
            </div>
          </Col>
        );
      })}
    </>
  );
};

export default ContentMoviePageHome;
