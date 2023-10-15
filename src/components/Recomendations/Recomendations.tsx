import styles from './Recomendations.module.css'
import { ReactNode, useState, useEffect, Children, cloneElement } from 'react';
import pointer from '../../assets/filmPageAssets/pointer.svg'

type props = {
    children: ReactNode;
    length: number;
}
const PAGE_WIDTH = 210;

export function Recomendations({children, length} : props) {
    const [offset, setOffset] = useState(0);

    const handleLeftPointerClick = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + PAGE_WIDTH;
            return Math.min(newOffset, 0);
        })
    }
    const handleRightPointerClick = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset - PAGE_WIDTH;
            const maxOffset = -(PAGE_WIDTH * (length - 3.5));
            return Math.max(newOffset, maxOffset);
        })
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.firstContainer}>
                <div className={styles.text}>Recommendations</div>
                <div className={styles.buttons}>
                    <div onClick={handleLeftPointerClick}><img className={styles.pointer} src={pointer} alt="pointer" /></div>
                    <div onClick={handleRightPointerClick}><img className={styles.pointerReverse} src={pointer} alt="pointer" /></div>
                </div>
            </div>
            <div className={styles.recommendations}>
                <div className={styles.allPagesContainer} style={{
                transform: `translateX(${offset}px)`,
            }}>{children}</div>
            </div>
        </div>
    );
}