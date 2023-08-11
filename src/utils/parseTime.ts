export const parseTime = (time: number) => {
    const secondsLeft = Math.floor(time / 1000);

    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    return (
        `${hours.toString().padStart(2, '0')}` +
        `:${minutes.toString().padStart(2, '0')}` +
        `:${seconds.toString().padStart(2, '0')}`
    );
};
