import MyButton from 'components/Mybutton';
import MyHeader from 'components/MyHeader';
import SearchBook from 'components/SearchBook';

const AddBook = () => {

  return (
    <div className='AddBook'>
      <MyHeader
        leftChild={<MyButton text={'뒤로가기'} />
        }
        rightChild={
          <MyButton text={'완료하기'} type={'complete'} />
        }
      />
      <section>
        <SearchBook />
      </section>
    </div>
  )
}

export default AddBook;