import { useEffect } from 'react';
import api from '../../apis/api';
import { useState } from 'react';
import { Row } from 'antd';
import HSectionContainer from '../../common/h-section-container';
import styles from './home.module.scss';
import ContentMoviePageHome from './content-movie-page-home';

const Home = () => {

  const [data, setData] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/gh/tconns/demo-tdm/data_recommend.json');
        setData(response.data.data.items);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
        for(let i = 0; i < data.length; i++) {
            if (e.key === 'ArrowUp' && currentIndex > 0) {
                setCurrentIndex(currentIndex - 4);
              } else if (e.key === 'ArrowDown' && currentIndex < data[i].items.length - 1) {
                setCurrentIndex(currentIndex + 4);
              } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
              } else if (e.key === 'ArrowRight' && currentIndex < data[i].items.length - 1) {
                setCurrentIndex(currentIndex + 1);
              }
        }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, data]);

  return (
    <div className={styles['app']}>
        <HSectionContainer className='px-[50px] md:px-0'>
            {data.map((item: any, index: number) => {
            return (
                <div key={index} className='mb-[50px]'>
                <p className='text-white font-bold text-lg mb-3'>{item.title}</p>
                <Row key={index} gutter={[24, 48]} className='flex'>
                    <ContentMoviePageHome {...{
                        item: item.items,
                        titleMovie: item.title,
                        currentIndex: currentIndex,
                    }}/>
                </Row>
                </div>
            )
            })}
        </HSectionContainer>
    </div>
  );
}

export default Home;
