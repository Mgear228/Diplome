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
    const [searchParams, setSearchParams] = useSearchParams();

    const [inputValue, setInputValue] = useState<string>('');
    const [inputFrom, setInputFrom] = useState<string>('');
    const [dropdownValue, setDropdownValue] = useState<string>('');

    const [clear, setClear] = useState<boolean>(false);

    const resetFilters = () => {
        setClear(!clear);
        setInputValue('');
        setInputFrom('');
    }

    const handleChange = (e: any) => {
        const currValue = e.target.value;
        setInputValue(currValue);
    }
    const handleChangeFrom = (e: any) => {
        const currValue = e.target.value;
        setInputFrom(currValue);
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
                <div className={styles.filmName}>Full or short movie name
                    <Input type='text' value={inputValue} onChange={handleChange} classname={styles.nameInput} placeholder='Your Text' />
                </div>
                <div className={styles.genre}>Genre
                    <Dropdown callback={setDropdownValue} reset={clear} placeholder='Choose genre' nameOfElems={['Movie', 'Series', 'Episode']}/>
                </div>
                <div className={styles.fromToBlock}>Year
                    <Input type='text' value={inputFrom} onChange={handleChangeFrom} classname={styles.nameInput} placeholder='Enter the year'/>
                </div>
                <div className={styles.countryBlock}>Country
                    <Dropdown reset={clear} placeholder='Select country' nameOfElems={['Belarus', 'Russia', 'Palestine']}/>
                </div>
                <div className={styles.clearShowBtns}>
                    <button className={styles.endBtn} onClick={resetFilters}>Clear filter</button>
                    <button className={styles.endBtn} onClick={confirmResults}>Show results</button>
                </div>
            </div>
        </>
    );
}