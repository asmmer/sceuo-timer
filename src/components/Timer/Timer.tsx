import React, { useState, useEffect } from 'react';
import { Icon, Icons } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Themes } from '../constants/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/app/actions';
import StorageSaver from '../../helpers/storage-saver';
import { THEME_KEY } from '../../store/app/reducers';

import './Timer.sass';
import 'react-circular-progressbar/dist/styles.css';

interface ITimeObject {
    seconds: number;
    minutes: number;
    hours: number;
}

const 
    STANDARD_INTERVAL = 1000,
    HOURS_LIMIT = 100,
    MINUTES_LIMIT = 60,
    SECONDS_LIMIT = 60,
    PROGRESS_BAR_TEXT_SIZE = '15px',
    PROGRESS_BAR_STROKE_COLOR = 'RGB(5, 105, 203)',
    PROGRESS_BAR_STROKE_WIDTH = 7.5,
    TIME_OBJECT: ITimeObject = {
        hours: 0,
        minutes: 0,
        seconds: 0
    }

enum TimerState {
    isStoped,
    isRunning,
    isPaused
}

let timer: NodeJS.Timeout;

export const Timer: React.FC = () => {
    const 
        dispatch = useDispatch(),
        { theme } = useSelector((state: any) => state.app);

    const 
        [timerState, setTimerState] = useState(TimerState.isStoped),
        [parsedTime, setParsedTime] = useState(""),
        [time, setTime] = useState(TIME_OBJECT),
        [isThemeChanging, setIsThemeChanging] = useState(false);

    const runTimer = (): void => {
        setTimerState(TimerState.isRunning);
        timer = setInterval(getTick, STANDARD_INTERVAL);
    }

    const pauseTimer = (): void => {
        setTimerState(TimerState.isPaused);
        clearInterval(timer);
    }

    const stopTimer = (): void => {
        setTimerState(TimerState.isStoped);
        setTime(TIME_OBJECT);
        clearInterval(timer);
    }

    const getTick = (): void => {
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

    const getParsedTime = ({ hours, minutes, seconds }: ITimeObject): string => {
        const 
            parsedHours = (hours < 10) ? `0${hours}` : `${hours}`,
            parsedMinutes = (minutes < 10) ? `0${minutes}` : `${minutes}`,
            parsedSeconds = (seconds < 10) ? `0${seconds}` : `${seconds}`

        return `${parsedHours}:${parsedMinutes}:${parsedSeconds}`;
    }

    useEffect(() => {
        setParsedTime(getParsedTime(time));
    }, [time]);

    useEffect(() => {
        StorageSaver.save(THEME_KEY, theme);
    }, [theme]);

    const
        timerClass = `timer${(isThemeChanging) ? ' is_theme_changing' : ''}`,
        timeClass = `timer__time timer__time_${theme} ${(timerState === TimerState.isPaused) ? 'timer__time_paused' : ''}`,
        themeIcon = (theme === Themes.Light) ? Icons.Moon : Icons.Sun,
        playStopAction = (timerState !== TimerState.isRunning) ? runTimer : stopTimer,
        toggleThemeAction = () => {
            setIsThemeChanging(true);
            dispatch(toggleTheme());
            setTimeout(() => setIsThemeChanging(false), 300)
        };

    return <section className={timerClass}>
        <h1 className="timer__header">sceuo-timer</h1>
        <div className={timeClass}>
            <CircularProgressbar 
                value={time.seconds}
                text={parsedTime}
                minValue={0}
                maxValue={SECONDS_LIMIT}
                strokeWidth={PROGRESS_BAR_STROKE_WIDTH}
                styles={buildStyles({
                    trailColor: 'transparent',
                    pathColor: PROGRESS_BAR_STROKE_COLOR,
                    textSize: PROGRESS_BAR_TEXT_SIZE,
                    textColor: 'inherit'
                })}
            />
        </div>
        <div className="timer__controller">
            <Button onClick={playStopAction}>
                {timerState !== TimerState.isRunning ? <Icon type={Icons.Start}/> : <Icon type={Icons.Stop}/>}
            </Button>
            <Button 
                onClick={pauseTimer}
                disabled={timerState !== TimerState.isRunning}
            >
                <Icon type={Icons.Pause}/>
            </Button>
            <Button 
                onClick={toggleThemeAction}
                disabled={isThemeChanging}
            >
                <Icon type={themeIcon}/>
            </Button>
        </div>
    </section>
}