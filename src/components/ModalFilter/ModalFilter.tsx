import styles from './ModalFilter.module.css'
import close from '../../assets/modalFilterAssets/Close.svg'
import { useState } from "react";
import { Input } from '../Input/Input';
import { Dropdown } from '../Dropdown/Dropdown';
import { useSearchParams } from 'react-router-dom';

type props = {
    onClick: () => void;
    state: boolean;
    setState?: (bool: boolean) => void;
}

export function ModalFilter({onClick, state, setState} : props) {
    const [selected, setSelected] = useState<boolean>(false);
    const [sortingBy, setSortingBy] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const [inputValue, setInputValue] = useState<string>('');
    const [inputFrom, setInputFrom] = useState<string>('');
    const [inputTo, setInputTo] = useState<string>('');
    const [dropdownValue, setDropdownValue] = useState<string>('');

    const [clear, setClear] = useState<boolean>(false);

    const resetFilters = () => {
        setClear(!clear);
        setInputValue('');
        setInputFrom('');
        setInputTo('');
    }

    const handleChange = (e: any) => {
        const currValue = e.target.value;
        setInputValue(currValue);
    }
    const handleChangeFrom = (e: any) => {
        const currValue = e.target.value;
        setInputFrom(currValue);
    }
    const handleChangeTo = (e: any) => {
        const currValue = e.target.value;
        setInputTo(currValue);
    }

    const confirmResults = () => {
        setSearchParams((prevParams: URLSearchParams) => {
            if(inputValue) prevParams.set("s", inputValue);
            prevParams.set("page", "1");
            if(dropdownValue) prevParams.set("type", dropdownValue);
            if(inputFrom) prevParams.set("y", inputFrom);
            return prevParams;
        });

        if(!setState) return;
        if(!inputValue && !dropdownValue && !inputFrom) {
            alert('Укажите фильтры!');
            return;
        }

        setState(true);
    }

    return (<>
            <div className={styles.bgFilter} onClick={onClick}></div>
            <div className={`${styles.main} ${state? styles.mainOpen : styles.mainClose}`}>
                <div className={styles.name}>Filters<img className={styles.close} onClick={onClick} src={close}/></div>
                <div className={styles.sortBy}>Sort by
                    <div className={styles.sorting}>
                        <div className={`${styles.sortElem} ${selected? styles.sortElemActive: ''}`} onClick={() => {setSelected(true); setSortingBy(true)}}>Rating</div>
                        <div className={`${styles.sortElem} ${!selected? styles.sortElemActive : ''}`} onClick={() => {setSelected(false); setSortingBy(false)}}>Year</div>
                    </div>
                </div>
                <div className={styles.filmName}>Full or short movie name
                    <Input value={inputValue} onChange={handleChange} classname={styles.nameInput} placeholder='Your Text' />
                </div>
                <div className={styles.genre}>Genre
                    <Dropdown callback={setDropdownValue} reset={clear} placeholder='Choose genre' nameOfElems={['Movie', 'Series', 'Episode']}/>
                </div>
                <div className={styles.fromToBlock}>Years
                    <div className={styles.shortInputBlock}>
                        <Input value={!sortingBy? inputFrom : ''} onChange={handleChangeFrom} classname={`${styles.shortInput} ${sortingBy? styles.shortInputInactive : ''}`} placeholder='From'/>
                        <Input value={!sortingBy? inputTo : ''} onChange={handleChangeTo} classname={`${styles.shortInput} ${sortingBy? styles.shortInputInactive : ''}`} placeholder='To'/>
                    </div>
                </div>
                <div className={styles.fromToBlock}>Rating
                    <div className={styles.shortInputBlock}>
                        <Input value={sortingBy? inputFrom : ''} onChange={handleChangeFrom} classname={`${styles.shortInput} ${!sortingBy? styles.shortInputInactive : ''}`} placeholder='From'/>
                        <Input value={sortingBy? inputTo : ''} onChange={handleChangeTo} classname={`${styles.shortInput} ${!sortingBy? styles.shortInputInactive : ''}`} placeholder='To'/>
                    </div>
                </div>
                <div className={styles.countryBlock}>Country
                    <Dropdown reset={clear} classname={styles.dropdownCountry} placeholder='Select country' nameOfElems={['Belarus']}/>
                </div>
                <div className={styles.clearShowBtns}>
                    <button className={styles.endBtn} onClick={resetFilters}>Clear filter</button>
                    <button className={styles.endBtn} onClick={confirmResults}>Show results</button>
                </div>
            </div>
        </>
    );
}