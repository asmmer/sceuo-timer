import React, { useState, useEffect } from 'react';

import './Timer.sass';

interface ITimeObject {
    seconds: number;
    minutes: number;
    hours: number;
}

/**
 * Constants.
 */
const STANDARD_INTERVAL = 1000;
const HOURS_LIMIT = 100;
const MINUTES_LIMIT = 60;
const SECONDS_LIMIT = 60;
const TIME_OBJECT: ITimeObject = {
    hours: 0,
    minutes: 0,
    seconds: 0
}

/**
 * Timer states.
 */
enum TimerState {
    isStoped,
    isRunning,
    isPaused
}

/**
 * setInterval object.
 */
let timer: NodeJS.Timeout;

export const Timer: React.FC = () => {

    /**
     * State of timer.
     */
    const [timerState, setTimerState] = useState(TimerState.isStoped);

    /**
     * Parsed time for user.
     */
    const [parsedTime, setParsedTime] = useState("");

    /**
     * Time object.
     */
    const [time, setTime] = useState(TIME_OBJECT);

    const runTimer = () => {
        setTimerState(TimerState.isRunning);
        timer = setInterval(getTick, STANDARD_INTERVAL);
    }

    const pauseTimer = () => {
        setTimerState(TimerState.isPaused);
        clearInterval(timer);
    }

    const stopTimer = () => {
        setTimerState(TimerState.isStoped);
        setTime(TIME_OBJECT);
        clearInterval(timer);
    }

    const getTick = () => {
        setTime((time: ITimeObject) => {
            let { hours, minutes, seconds }: ITimeObject = time;
     
            seconds++;

            if (seconds > SECONDS_LIMIT - 1) {
                seconds = 0;
                minutes++;
            }

            if (minutes > MINUTES_LIMIT - 1) {
                minutes = 0;
                hours++;
            }

            if (hours > HOURS_LIMIT) {
                stopTimer();
            }

            return {
                hours,
                minutes,
                seconds
            }
        })
    }

    const getParsedTime = () => {
        let { hours, minutes, seconds }: ITimeObject = time;
        let parsedHours = (hours < 10) ? `0${hours}` : `${hours}`,
            parsedMinutes = (minutes < 10) ? `0${minutes}` : `${minutes}`,
            parsedSeconds = (seconds < 10) ? `0${seconds}` : `${seconds}`

        return `${parsedHours}:${parsedMinutes}:${parsedSeconds}`;
    }

    useEffect(() => {
        setParsedTime(getParsedTime());
    }, [time]);

    const timeClass = `timer__time ${(timerState === TimerState.isPaused) ? 'timer__time_paused' : ''}`;
    const playStopAction = (timerState === TimerState.isStoped || 
                            timerState === TimerState.isPaused) ? () => runTimer() : () => stopTimer()

    return <div className="timer">
        <div className="timer__header">
            <h1>sceuo-timer</h1>
        </div>
        <div className={timeClass}>
            {parsedTime}
        </div>
        <div className="timer__controller">
            <button className="timer__button" onClick={playStopAction}>
                {(timerState === TimerState.isStoped) ? 'Start' :
                 (timerState === TimerState.isPaused) ? 'Continue' : 'Stop'}
            </button>
            <button
                className="timer__button"
                onClick={() => pauseTimer()}
                disabled={timerState === TimerState.isStoped || timerState === TimerState.isPaused}
            >
                Pause
            </button>
        </div>
    </div>
}