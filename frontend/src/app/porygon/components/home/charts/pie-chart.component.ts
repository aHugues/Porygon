import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'pie-chart',
    template: `<div class="piechart" #piechart id="piechart"></div>yolo`,
    encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit, OnChanges {
    @ViewChild('piechart') private chartContainer: ElementRef;
    @Input() private data: Array<any>;
    private dataSet: Array<Data>;

    private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;
    private radius: any;

    constructor() {
        this.dataSet = [
            {
                label: "test1",
                value: 3
            },
            {
                label: "test2",
                value: 14
            }
        ]
    }

    ngOnInit() {
        this.createChart();
        if (this.data) {
            this.updateChart();
        }
    }

    ngOnChanges() {
        if (this.chart) {
            this.updateChart();
        }
    }

    createChart(): void {
        const element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        this.radius = Math.min(this.width, this.height) / 2;

        const svg = d3.select(".piechart")
            .append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight)
            .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        // arc to be used in the pie chart
        let arc = d3.arc()
            .innerRadius(0)
            .outerRadius(this.radius);

        // auto colors for the chart
        this.colors = d3.scaleOrdinal(d3.schemeCategory20b);

        // pie chart
        let pie = d3.pie<Data>()
            .value((d: any) => d.value)
            .sort(null);

        let g = svg.selectAll('.arc')
            .data(pie(this.dataSet))
            .enter().append('g')
            .attr('class', 'arc');

        g.append('path')
            .attr('d', <any>arc)
            .style('fill', (d) => this.colors(d.data.label))

        

    }

    updateChart(): void {

    }


}

interface Data {
    label: string;
    value: number;
}
