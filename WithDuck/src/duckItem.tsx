import { Duck } from './demo'

interface Props {
    duck: Duck
}


export default function duckItem({duck}: Props) {
    return (
        <div key={duck.name}>
            <span>{duck.name}</span>
            <button onClick={() => console.log(duck.name + ' Quack')}>Make a Sound</button>
        </div>
    )
}
