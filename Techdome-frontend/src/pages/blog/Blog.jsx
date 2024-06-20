import React, { useEffect, useState } from 'react';
import './blog.scss';
import NavBar from '../../components/navbar/NavBar';
import BlogCard from '../../components/blogCard/BlogCard';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { ThreeCircles } from 'react-loader-spinner';
import { getBlog } from '../../apiConfig/api'; // Corrected import path

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogArray, setBlogArray] = useState([]);
  const [blogData, setBlogData] = useState({
    title: '',
    description: '',
    img: ''
  });

  useEffect(() => {
    getBlog()
      .then(data => {
        setBlogArray(data);
        setBlogData({
          title: data[0]?.title || '',
          description: data[0]?.description || '',
          img: data[0]?.img || ''
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch blogs:', error);
        setIsLoading(false);
      });
  }, []);

  const setBlog = data => {
    setBlogData({
      title: data.title,
      description: data.description,
      img: data.img
    });
  };

  return (
    <div className='blogPage'>
      <NavBar />

      {isLoading ? (
        <div className='loader_blog'>
          <ThreeCircles
            height="100"
            width="100"
            color="#fff"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      ) : null}

      <div className='inner'>
        <div
          className='imageCon'
          style={{ background: `url(${blogData.img})`, backgroundSize: 'cover' }}
        >
          <div>
            <section> {blogData.title} </section>
          </div>
        </div>

        <div className='title'>Description : </div>

        <div className='Description'>
          {blogData.description}
        </div>

        <div className='bottomHeader'>
          Short Reads
          <ArrowCircleLeftIcon className='rightArrow' style={{ fontSize: '30px' }} />
          <ArrowCircleRightIcon className='leftArrow' style={{ fontSize: '30px' }} />
        </div>

        <div className='blogCardCon'>
          {blogArray.map((val, index) => (
            <BlogCard key={index} data={val} fun={setBlog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
