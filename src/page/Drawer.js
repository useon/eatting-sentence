import MyButton from 'components/Mybutton';
import MyHeader from 'components/MyHeader';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Drawer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.title;
  const thumbnail = location.state.thumbnail;
  return (
    <div>
      <MyHeader
        leftChild={<MyButton text={'뒤로가기'} onClick={() => navigate(-1)} />}
        rightChild={<MyButton text={'문장 추가하기'} />}
      />
      <section>
        <div>
          <img src={thumbnail} alt="책표지" className="" />
          <div>
            <span>{title}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Drawer;
