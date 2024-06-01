import {React,useEffect,useState} from 'react'
import link from './assets/link.png'
import upload from './assets/upload.png'
import { useLazyGetSummaryQuery } from './services/article'
import loader from './assets/loader.svg'

const Demo = () => {
  
  const [article,setArticle] = useState({
    url:'',
    summary:''
  })

  const [allArticles , setAllArticles] = useState([])
  const [getsummary , {error,isFetching}] = useLazyGetSummaryQuery();

  useEffect(()=>{
    const articlesFromLocalStorage = JSON.parse
    (
      localStorage.getItem('articles')
    )

    if (articlesFromLocalStorage)
    {
      setAllArticles(articlesFromLocalStorage)
    }
  },[]);

  const handleFunction = async (e) =>{
      e.preventDefault();

      const {data} = await getsummary({
        articleUrl: article.url
      });

      if (data?.summary){
        const newArticle = {...article,summary:data.summary};
        const updatedAllArticles = [newArticle,...allArticles];
        setArticle(newArticle);
        setAllArticles(updatedAllArticles)
        
        localStorage.setItem('articles',JSON.stringify(updatedAllArticles));
      }

      
  }

  return (
    <section className='mt-16 w-full max-w-xl'>

      <div className='flex flex-col w-full gap-2'>

        <form className='relative flex justify-center items-center' onSubmit={handleFunction}> 

          <img src={link} alt='link_icon' className='absolute left-0 my-2 ml-3 w-5'/>

          <input type="url" placeholder='Enter the URL of the article or report' value={article.url} 
          onChange={(e) => setArticle({
            ... article , url:e.target.value /* here the "...article is a object SO, the whole object is getting updated and next is the url"*/
          
          })} 
          className='url_input peer' required
          />

          <button type='submit' className='submit_btn'>
            <img src={upload} alt="upload" className='w-5'/>
          </button>

        </form>
       

      </div>
      
      <div className='my-10 max-w-full flex justify-center items-center'>
            {
              isFetching ? (
                  <img src={loader} alt="loader" className='w-10 h-10 object-contain'/>
              ) : error ? (
                <p className='font-bold font-inter text-black text-center'>An error occured
                  <br />
                 <span className='text-red-700 font-satoshi'> 
                    {error?.data?.error}
                  </span>
                </p>
              ) : (
                article.summary && (
                  <div className='flex flex-col gap-3'>
                    <h2 className='text-gray-600 font-satoshi font-bold text-xl '>Article <span className='blue_gradient'>Summary</span></h2>
                    <div className='summary_box'>
                      <p>
                        {article.summary}
                      </p>
                    </div>
                  </div>
                )
              )
            }
      </div>

    </section>
  )
}

export default Demo