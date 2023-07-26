//@ts-nocheck
import React, {useRef, useState, useEffect} from 'react';
import HTMLFlipBook  from 'react-pageflip';
import styles from '../styles/view.module.css'
import axios, {AxiosResponse} from 'axios';

interface IStory {
    _id: string;
    image: string,
    imageTextAnnotation: string;
    jsonStory: any;
    user: string;
    generatedStory?: string;
}

const Page = React.forwardRef((props, ref) => {
    return (
      <div className={styles.page} ref={ref}>
        <div className={"page-content"}>
          <h2 className={styles.pageHeader}>{props.name}</h2>
          <div className="page-image"></div>
          <div className={styles.pageText}>{props.children}</div>
        </div>
      </div>
    );
  });
Page.displayName = 'Page';

const PageCover = React.forwardRef((props, ref) => {
    return (
    <div className={styles.pageCover} ref={ref} data-density="hard">
        <div className="page-content">
        <h2>{props.children}</h2>
        </div>
    </div>
    );
});
PageCover.displayName = 'PageCover'

export default function Book ({ pages }) {
    const flipBookRef = useRef(null);

    const [page, setPage] = useState(0);
    const [allPages, setAllPages] = useState(pages);

    const nextButtonClick = () => {
        if (flipBookRef.current) {
            let pageFlip = flipBookRef.current.pageFlip();
            pageFlip.flipNext('top');
        }
    };

    const prevButtonClick = () => {
        if (flipBookRef.current) {
            let pageFlip = flipBookRef.current.pageFlip();
            pageFlip.flipPrev('top');
        }
    };

    const onPage = (e) => {
        setPage(e.data);
    };

    const deleteStory = (story : IStory) => {
        axios("http://localhost:8080/api/story", {
            method: 'DELETE',
            withCredentials: true,
            data: {
                story: story._id
            }
        }).then((res: AxiosResponse) => {
            if(res.data) {
                setAllPages(allPages.filter(page => page._id !== story._id));
            }
        });
    }

    return (
        <div style={{minHeight: '100vh', overflow: 'auto'}}>
            <HTMLFlipBook
            width={'100%'}
            height={'100%'}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={800}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className={styles.book}
            onFlip={onPage}
            ref={flipBookRef}
            >
            <PageCover>Your Stories</PageCover>
            {allPages.map((story, index) => (
            <Page key={index} number={index+1} name={story.jsonStory.early.name || 'Name'} className="page" >
                <h2>{story.jsonStory.name}</h2>
                <p>{story.generatedStory}</p>
                <button onClick={() => deleteStory(story)}>Delete</button>
            </Page>
            ))}
            <PageCover>THE END</PageCover>
            </HTMLFlipBook>

            <div className={styles.container}>
            <div className={styles.navigation}>
                <button type="button" onClick={prevButtonClick}>
                Previous page
                </button>
                [<span>{page}</span> of <span>{allPages.length+1}</span>]
                <button type="button" onClick={nextButtonClick}>
                Next page
                </button>
            </div>
            </div>
        </div>
    );
};
