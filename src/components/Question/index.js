import './index.css';
import { useEffect, useState } from 'react';

function Question() {
  const [question, setQuestion] = useState(null);

  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    let timeoutId;

    const fetchData = async () => {
      fetch("https://opentdb.com/api.php?amount=1")
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data.results[0]);
        console.log(data.results[0]);
      })
      .catch((error) => console.log(error));
    }

    if(shouldFetch){
      timeoutId = setTimeout(() => {
        fetchData();
        setShouldFetch(false);
      }, 300);
    }

    return() => {
      clearTimeout(timeoutId);
    }
  }, [shouldFetch]);



  return(
    <>
      <button onClick={() => {setShouldFetch(true)}}>Reset</button>
      <div>{question.question}</div>
    </>
  );
}

export default Question;