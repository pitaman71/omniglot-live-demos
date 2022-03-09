import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core';

import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';

const treeData = {
    "name": "Eve",
    "value": 15,
    "type": "black",
    "level": "yellow",
    "children": [
       {
          "name": "Cain",
          "value": 10,
          "type": "grey",
          "level": "red"
       },
       {
          "name": "Seth",
          "value": 10,
          "type": "grey",
          "level": "red",
          "children": [
             {
                "name": "Enos",
                "value": 7.5,
                "type": "grey",
                "level": "purple"
             },
             {
                "name": "Noam",
                "value": 7.5,
                "type": "grey",
                "level": "purple"
             }
          ]
       },
       {
          "name": "Abel",
          "value": 10,
          "type": "grey",
          "level": "blue"
       },
       {
          "name": "Awan",
          "value": 10,
          "type": "grey",
          "level": "green",
          "children": [
             {
                "name": "Enoch",
                "value": 7.5,
                "type": "grey",
                "level": "orange"
             }
          ]
       },
       {
          "name": "Azura",
          "value": 10,
          "type": "grey",
          "level": "green"
       }
    ]
 };

export function StaticDiagramDemo1(props: {
    pixelSize: {
        width: number,
        height: number
    },
}) {
    const nodeSize = {
        width: 80,
        height: 25
    };
    const theme = useTheme();

    React.useEffect(() => {

        d3.select('#chart').selectAll().remove();

        // create a DOM node for the chart
        const g = d3.select("#chart")
        .append("svg")
        .attr("viewBox", [ -10, -10, props.pixelSize.width, props.pixelSize.height ])
        .style("border", "1px solid black")
        .append("g")

        // declare a treemap data structure and a hierarchy layout for it
        const treemap = d3.tree().size([props.pixelSize.height, 250]);
        let nodes:any = d3.hierarchy<d3.HierarchyNode<any>>(treeData as any, d => d.children);
        nodes = treemap(nodes);

        // place each node according to the x,y assigned by the hierarchy layout
        const node = g.selectAll(".node")
        .data(nodes.descendants())
        .enter().append("g")
        .attr("class", (d:any) => "node" + (d.children ? " node--internal" : " node--leaf"))
        .attr("transform", (d:any) => {
            return "translate(" + (d.x) + "," + (d.y + nodeSize.height/2) + ")"
        });

        // connect parent-child node pairs with a curved edge
        const link = g.selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .style("stroke", (d:any) => d.data.level)
        .style("fill", (d:any) => 'none')
        .attr("d", (d:any) => {
            return "M" + d.x + "," + d.y
                + "C" + (d.x + d.parent.x) / 2 + "," + d.y
                + " " + (d.x + d.parent.x) / 2 + "," + d.parent.y
                + " " + d.parent.x + "," + d.parent.y;
        });

        // represent each node as a rect
        node.append("text")
        .attr('width', '12em')
        .attr('height', '3.53em')
        .text((d:any) => d.data.name)
        .style('fill', theme.palette.text.primary)
        .style('stroke', theme.palette.text.primary)
        .style('text-anchor', 'middle')
    }, []);
        
    return (
        <div id="chart"/>
    )
}

const flatData = [
    {
        id: "project",
        brand: "Hermes",
        name: "2022 Summer Launch",
        date: "4/13/2022",
        image: '/images/Hermes_Logo.png'
    },
    {
        id: "Owner",
        role: "Brand Manager",
        name: "Ruzin De Deugd",
        parentId: "project",
        image: '/images/ruzin_de_deugd_face.jpg'
    },
    // {
    //     id: "production",
    //     role: "Production",
    //     parentId: "Owner"
    //  },
    //  {
    //     id: "stylists",
    //     role: "Stylists",
    //     parentId: "Owner"
    //  },
    //  {
    //     id: "ambassadors",
    //     role: "Models &amp; Influencers",
    //     parentId: "Owner"
    //  },
     {
        id: "camera",
        role: "Videographer",
        parentId: "Owner"
     },
     {
        id: "lighting",
        role: "Lighting",
        name: "Griffin Lighting",
        parentId: "Owner",
        image: '/images/griffin_lighting.jpg'
     },
     {
        id: "hair",
        role: "Hair",
        name: "Karrie LaShay",
        parentId: "Owner",
        image: '/images/karrie_lashay_hair.jpg'
     },
     {
        id: "makeup",
        role: "Makeup",
        name: "K. Lezinska",
        parentId: "Owner",
        image: '/images/k_lezinska_mua.jpg'
     },
     {
        id: "model",
        role: "Model",
        parentId: "Owner"
     },
];

export function StaticDiagramDemo(props: {
    pixelSize: {
        width: number,
        height: number
    },
}) {
    const d3Container = React.useRef<HTMLDivElement>(null);
    const [ height, setHeight ] = React.useState<number>(0);
    const [ width, setWidth ] = React.useState<number>(0);

    React.useEffect(() => {
        setHeight(d3Container.current?.parentElement?.clientHeight || 0);
    }, [ d3Container.current ]);
    let chart:null|OrgChart<any> = null;
    
    const useStyles = makeStyles((theme) => ({
        d3DiagramContainer: {
            height: '100%',
            '& div': { 
                height: 'auto'
            },
            '& .node-button-g': {
                'display': 'none'
            }
        }
    }));
    const classes = useStyles();

    // We need to manipulate DOM
    React.useLayoutEffect(() => {
      if (d3Container.current) {
        if (!chart) {
          chart = new OrgChart();
        }
        chart
          .container(d3Container.current as any)
          .data(flatData)
          .svgHeight(height)
          .svgWidth(width)
          .nodeWidth((d:any) => 120)
          .nodeHeight((d:any) => 170)
          .nodeContent((d:any) => {
              let rows = [];
              if(d.data.role) rows.push(`<b>${d.data.role}</b>`);
              if(d.data.brand) rows.push(`<b>${d.data.brand}</b>`);
              if(d.data.name) rows.push(d.data.name);
              if(d.data.date) rows.push(`<em>${d.data.date}</em>`);
              if(d.data.image) rows.push(`<img style="max-height: 70px; max-width: 100%;" src="${d.data.image}"/>`);
              if(!d.data.name && !d.data.image) {
                rows.push(`
                <div style="max-height: 70px; max-width: 100%;">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;" viewBox="0 0 846.66 846.66" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd"><defs><style type="text/css">
   
                .fil0 {fill:white}
               
              </style></defs><g><path class="fil0" d="M400.56 85.99l45.54 0c77.07,0 140.1,63.03 140.1,140.1l0 69.13c0,61.92 -35.07,116.11 -86.31,143.56l0 66.79c96.48,22.27 245.32,82.35 245.32,227.54l0 27.55 -321.88 0 -321.88 0 0 -27.55c0,-145.19 148.84,-205.27 245.32,-227.54l0 -66.79c-51.24,-27.45 -86.31,-81.64 -86.31,-143.56l0 -69.13c0,-77.07 63.03,-140.1 140.1,-140.1zm47.78 283.55l-53.48 0c-0.61,-46.97 4.37,-62.93 42.7,-94.24 16.07,-13.02 38.43,-26.95 38.43,-49.82 0,-27.76 -25.72,-41.38 -50.63,-41.38 -33.24,0 -51.64,20.74 -58.25,51.75l-53.89 -6.92c3.66,-58.56 54.8,-89.67 109.7,-89.67 52.46,0 110.41,29.08 110.41,87.95 0,36.9 -31.92,62.32 -57.95,83.87 -24.19,20.13 -27.75,26.94 -27.04,58.46zm-53.48 78.69l0 -58.56 53.48 0 0 58.56 -53.48 0z"></path></g></svg>
                </div>`);
              }
              const divs = rows.map(row => `<div style="margin-top: 0.5em">${row}</div>`).join('\n');
              return `<div style="border: 1px solid white; height: 100%; padding: 0.5em; overflow: hidden">${divs}</div>`;
          })
          .render();
          chart.expandAll();
      }
    }, [d3Container.current]);
  
    return (
        <div className={classes.d3DiagramContainer}>
            <div ref={d3Container} />
        </div>
    );
  
}
