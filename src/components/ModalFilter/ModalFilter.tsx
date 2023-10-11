import styles from './ModalFilter.module.css'
import close from '../../assets/modalFilterAssets/Close.svg'
import { useState } from "react";
import { Input } from '../Input/Input';
import { Dropdown } from '../Dropdown/Dropdown';

type props = {
    onClick: () => void;
    state: boolean;
}

export function ModalFilter({onClick, state} : props) {
    const [selected, setSelected] = useState(false);

    return (<>
            <div className={styles.bgFilter} onClick={onClick}></div>
            <div className={`${styles.main} ${state? styles.mainOpen : styles.mainClose}`}>
                <div className={styles.name}>Filters<img className={styles.close} onClick={onClick} src={close}/></div>
                <div className={styles.sortBy}>Sort by
                    <div className={styles.sorting}>
                        <div className={`${styles.sortElem} ${selected? styles.sortElemActive: ''}`} onClick={() => setSelected(true)}>Rating</div>
                        <div className={`${styles.sortElem} ${!selected? styles.sortElemActive : ''}`} onClick={() => setSelected(false)}>Year</div>
                    </div>
                </div>
                <div className={styles.filmName}>Full or short movie name
                    <Input classname={styles.nameInput} placeholder='Your Text' />
                </div>
                <div className={styles.genre}>Genre
                    <Dropdown placeholder='Choose genre' nameOfElems={['Movie', 'Series', 'Episode']}/>
                </div>
                <div className={styles.fromToBlock}>Years
                    <div className={styles.shortInputBlock}>
                        <Input classname={styles.shortInput} placeholder='From'/>
                        <Input classname={styles.shortInput} placeholder='To'/>
                    </div>
                </div>
                <div className={styles.fromToBlock}>Rating
                    <div className={styles.shortInputBlock}>
                        <Input classname={styles.shortInput} placeholder='From'/>
                        <Input classname={styles.shortInput} placeholder='To'/>
                    </div>
                </div>
                <div className={styles.countryBlock}>Country
                    <Dropdown classname={styles.dropdownCountry} placeholder='Select country' nameOfElems={['Belarus']}/>
                </div>
                <div className={styles.clearShowBtns}>
                    <button className={styles.endBtn}>Clear filter</button>
                    <button className={styles.endBtn}>Show results</button>
                </div>
            </div>
        </>
    );
}