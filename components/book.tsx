//@ts-nocheck
import React, {useRef, useState, useEffect} from 'react';
import HTMLFlipBook  from 'react-pageflip';
import styles from '../styles/view.module.css'
import { authenticatedFetch } from '../lib/user';

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
        <div className={styles['page-content']}>
          <h2>{props.name}</h2>
          <div>{props.children}</div>
        </div>
      </div>
    );
  });
Page.displayName = 'Page';

const PageCover = React.forwardRef((props, ref) => {
    return (
    <div className={styles.pageCover} ref={ref} data-density="hard">
        <div className={styles['page-content']}>
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

    const deleteStory = async (story : IStory) => {
        try {
            const res = await authenticatedFetch('/api/story', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    story: story._id,
                }),
            });
    
            const data = await res.json();
            if (data) {
                setAllPages(allPages.filter(page => page._id !== story._id));
            }
        } catch (error) {
            console.error('Failed to delete story', error);
        }
    }

    return (
        <div className={styles.book}>
            <HTMLFlipBook
            width={window.innerWidth/2}
            height={window.innerHeight}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onPage}
            ref={flipBookRef}
            >
            <PageCover/>
            {allPages.map((story, index) => (
            <Page key={index} number={index+1} className={styles.page} >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2>{story.jsonStory.name}</h2>
                    <button onClick={() => deleteStory(story)}>Delete</button>
                </div>
                <p>{story.generatedStory}</p>
            </Page>
            ))}
            <PageCover/>
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
