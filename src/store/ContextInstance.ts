import React from 'react';

export function createContext(id: string, defaultValue: any) {
    if (!window.HawksearchReact) {
        window.HawksearchReact = {};
    }

    if (!window.HawksearchReact.contextInstances) {
        window.HawksearchReact.contextInstances = {};
    }

    if (window.HawksearchReact.contextInstances[id]) {
        console.log('reused context ' + id)
        return window.HawksearchReact.contextInstances[id];
    }
    else {
        let context = React.createContext(defaultValue);
        console.log('created new context')
        window.HawksearchReact.contextInstances[id] = context;

        return context;
    }
}