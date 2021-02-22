import * as React from 'react';
import { CreateSlider, Options } from './utils';
import styles from './slideable.module.scss';

// FORK OF https://github.com/armandsalle/butter-slider to wrap it for React

interface Props extends Options {
    className?: string;
    progress?: boolean;
    children?: ((...args: any[]) => React.ReactElement | null) | React.ReactNode | React.ReactElement | Element | null;
}
const refsActive = (ref: any, refb: any) => ref.current !== null && refb.current !== null;
const clamp = (a: number, min = 18, max = 98) => Math.min(max, Math.max(min, a));

export const Slideable = (props: Props) => {
    const { className, container, slider, children, progress = false, ...rest } = props;

    const containerRef = React.useRef<HTMLDivElement>(null);
    const slideableRef = React.useRef<HTMLDivElement>(null);
    const progressRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        let isComponentMounted = true;
        if (!refsActive(containerRef, slideableRef)) return;
        if (isComponentMounted) {
            new CreateSlider({
                container: containerRef.current,
                slider: slideableRef.current,
                progressbar: progress ? progressRef.current : null,
                hasTouchEvent: true,
                dragSpeed: 2,
                smoothAmount: 0.1,
                ...rest,
            });
        }

        return () => {
            isComponentMounted = false;
        };
    }, []);

    const containerClassName = [styles.container, className].filter(Boolean).join(' ');
    return (
        <div className={containerClassName} ref={containerRef}>
            <div className={styles.viewport} ref={slideableRef}>
                {children}
            </div>
            {progress && (
                <div className={styles.progress} aria-hidden="true">
                    <div className={styles.bar} ref={progressRef}></div>
                </div>
            )}
        </div>
    );
};
