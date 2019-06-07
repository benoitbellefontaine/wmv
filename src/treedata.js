export default {
    name:'central network device', type:'root', pos:[0,0,0], dim:[4,1,4],
    children: [ // switches & hotspots
        { name:'switch 1', type:'switch', pos:[-50,0,-10], dim:[3,1,3],
            children: [
                { name: 'hotspot 1-1', type:'hotspot', pos:[-50,0,0], dim:[1,32,32] },
                { name: 'link switch 1 - hotspot 1-1', type:'link', start:[-50,0,-10], end:[-50,0,0] },
                { name: 'hotspot 1-2', type:'hotspot', pos:[-40,0,-10], dim:[1,32,32] },
                { name: 'link switch 1 - hotspot 1-2', type:'link', start:[-50,0,-10], end:[-40,0,-10] },
                { name: 'hotspot 1-3', type:'hotspot', pos:[-50,10,-10], dim:[1,32,32] },
                { name: 'link switch 1 - hotspot 1-3', type:'link', start:[-50,0,-10], end:[-50,10,-10] },
            ]
        },
        { name: 'link cnd - switch 1', type:'link', start:[0,0,0], end:[-50,0,-10] },
        // SW2
        { name:'switch 2', type:'switch', pos:[0,30,0], dim:[3,1,3],
            children: [
                { name: 'hotspot 2-1', type:'hotspot', pos:[10,30,0], dim:[1,32,32] },
                { name: 'link switch 2 - hotspot 2-1', type:'link', start:[0,30,0], end:[10,30,0] },
                { name: 'hotspot 2-2', type:'hotspot', pos:[0,30,-10], dim:[1,32,32] },
                { name: 'link switch 2 - hotspot 2-2', type:'link', start:[0,30,0], end:[0,30,-10] },
                { name: 'hotspot 2-3', type:'hotspot', pos:[0,30,10], dim:[1,32,32] },
                { name: 'link switch 2 - hotspot 2-3', type:'link', start:[0,30,0], end:[0,30,10] },
            ]
        },
        { name: 'link cnd - sw2', type:'link', start:[0,0,0], end:[0,30,0] },
        // SW3
        { name:'switch 3', type:'switch', pos:[50,0,0], dim:[3,1,3],
            children: [
                { name: 'hotspot 3-1', type:'hotspot', pos:[50,10,0], dim:[1,32,32] },
                { name: 'link sw3 hotspot 3-1', type:'link', start:[50,0,0], end:[50,10,0] },
                { name: 'hotspot 3-2', type:'hotspot', pos:[50,0,-10], dim:[1,32,32] },
                { name: 'link sw3 hotspot 3-2', type:'link', start:[50,0,0], end:[50, 0,-10] },
                { name: 'hotspot 3-3', type:'hotspot', pos:[50,0,10], dim:[1,32,32] },
                { name: 'link sw3 hotspot 3-3', type:'link', start:[50,0,0], end:[50, 0,10] },
            ]
        },
        { name: 'link cnd - sw3', type:'link', start:[0,0,0], end:[50,0,0] },
    ]
}
