// utility functions

// export const makeLog = (prefix:string)=> (...args: any[]) => console.log(prefix, ...args);

export function createLogger(prefix:string){
    return function(...args: any[]){
        console.log(prefix, ...args);
    }
}

