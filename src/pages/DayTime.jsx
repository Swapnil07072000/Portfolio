import React, {useEffect, useState} from "react";

function DayTime(){
    const [dayNight, setDayNight] = useState(new Date().toString());

    useEffect(()=>{
        const updateDayTime = () => {
            setDayNight(new Date().toString());
        }
        setInterval(updateDayTime, 200);
    });

    return (
        <>
        <h5 className="text text-white">{dayNight}</h5>
        </>
    )
}

export default DayTime;