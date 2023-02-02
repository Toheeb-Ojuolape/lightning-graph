import React, { useEffect, useRef } from "react";
import { useSocket } from "../../hooks/UseSocket";
import { useApi } from "../../hooks/UseApi";
import { Lnd } from "../../services/ApiTypes";
import { Graph } from "./components/Graph";

export const GraphScene = () => {
    const api = useApi();
    const graphRef = useRef<Graph>();

    useEffect(() => {
        api.fetchGraph().then((graph) => {
            if (graphRef.current) {
            graphRef.current.createGraph(graph);
            }
            console.log(graph);
            });
    }, []);

    useSocket("graph", (update: Lnd.GraphUpdate) => {
        if (graphRef.current) {
            graphRef.current.updateGraph(update);
            }
    });

    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col h-100">{<Graph ref={graphRef} />}</div>
            </div>
        </div>
    );
};
