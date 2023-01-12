type RouteType = {
    id: number;
    path: string;
    text: string;
    main: () => JSX.Element;
}

export default RouteType