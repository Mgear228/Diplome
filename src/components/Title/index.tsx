interface props {
    title: string;
}

export function Title({title} : props) {
    return <p>{title}</p>;
}