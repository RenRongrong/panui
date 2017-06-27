import { Component, OnInit, Input } from '@angular/core';
import {r_popUp} from './panui.animations';

/**轮播图的滑片 */
export interface slide {
    imgUrl: string,
    index: number,
    status: string,
    caption: string,
    href: string
}

/**轮播图 */
@Component({
    selector: 'rrr-carousel',
    template: `
        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" [ngStyle]="{'height': _carouselHeight, 'overflow':'hidden'}">
            <!-- Indicators -->
            <ol class="carousel-indicators" [ngStyle]="{'bottom': '2px'}">
                <li *ngFor="let slide of slides" data-target="#carousel-example-generic" [attr.data-slide-to]="slide.index" class="{{slide.status}}"></li>
            </ol>

            <!-- Wrapper for slides -->
            <div class="carousel-inner" role="listbox">
                <div *ngFor="let slide of slides" class="item {{slide.status}}">
                    <a href="{{slide.href}}">
                        <img src="{{slide.imgUrl}}" />
                        <div class="carousel-caption" [ngStyle]="{'top': _captionPosition}">
                            <p [ngStyle]="{'background-color': captionBgColor, 'font-size':_captionFontSize, 'color':captionFontColor}">{{slide.caption}}</p>
                        </div>
                    </a>
                </div>
            </div>

            <!-- Controls -->
            <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    `
})
export class RRRCarouselComponent implements OnInit {
    @Input()
    slides: slide[];
    @Input()
    height: number = 0;
    @Input()
    captionBgColor: string = 'rgba(3,3,6,0.4)';
    @Input()
    captionFontSize: number = 14;
    @Input()
    captionFontColor: string = 'white';

    _carouselHeight: string;
    _captionPosition: string;
    _captionFontSize: string;

    constructor() {
    }
    ngOnInit() {
        this._carouselHeight = this.height > 0 ? this.height.toString() + 'px' : 'auto';
        this._captionPosition = this.height > 0 ? (this.height - 60 - this.captionFontSize).toString() + 'px' : 'auto';
        this._captionFontSize = this.captionFontSize + 'px';
    }
}

/**折叠菜单的节点 */
export interface treeMenuNode {
    content: string,
    href: string,
    childs?: treeMenuNode[]
}

/**折叠菜单 */
@Component({
    selector: 'rrr-collapse',
    template: `
        <div class="collapseMenu {{levelClass}}">
            <a href="{{collapseTree.href}}" class="collapseNode {{collapseStatu}}" (click)="toggleCollapseStatu()" >{{collapseTree.content}}</a>
            <ul [collapse] = "isCollapsed" class="collapseTree">
                <li *ngFor="let node of collapseTree.childs">
                    <rrr-collapse *ngIf="node" [collapseTree] = "node" [level] = "level+1" ></rrr-collapse>
                </li>
            </ul>
        </div>
    `,
    styles: [`
        .collapseMenu{
            padding: 0;
            margin: 0px 1px 0 1px;
        }
        .collapseMenu>a{
            color: #00aa00;
            font-weight: bold;
            font-size: 16px;
            font-family: '微软雅黑';
        }
        .collapseNode:hover, .level-2>.collapseNode:hover, .level-3>.collapseNode:hover{
            text-decoration: none;
            background-color: #EED5B7;
        }
        .collapseNode:focus{
            text-decoration: none;
        }
        .collapseNode{
            background-color: aquamarine;
            border: none;
            width: 100%;
            height: 2em;
            display: block;
            position: relative;
            z-index: 3;
            height: 4em;
            line-height: 4em;
            text-align: center;
            border-bottom: 1px solid rgba(0,0,0,0.2);
            margin: 0;
        }
        .collapseNode.uncollapsed{
            box-shadow: 0px 2px 8px rgba(0,0,0,0.24);
        }
        .collapseTree{
            list-style: none;
            padding: 0 0;
            margin: 0;
        }
        .level-2>.collapseNode{
            background-color: #EED2EE;
            z-index: 2;
        }
        .level-3>.collapseNode{
            background-color: snow;
            z-index: 1;
        }
    `]
})
export class RRRCollapseComponent implements OnInit {
    public isCollapsed: boolean = true;
    public collapseStatu: string = "collapsed";
    public levelClass: string;

    @Input()
    collapseTree: treeMenuNode;

    @Input()
    level: number = 1;

    toggleCollapseStatu() {
        this.isCollapsed = !this.isCollapsed;
        this.collapseStatu = this.isCollapsed ? "collapsed" : "uncollapsed";
        if (this.collapseTree.href == '#') {
            return false;
        }
    }

    constructor() { }

    ngOnInit() {
        this.levelClass = 'level-' + this.level.toString();
    }

}

/**圆环图 */
@Component({
    selector: 'rrr-donut',
    template: `
    <div class="donut">
        <div class="donut-out" [ngStyle]="{'width': _width, 'height':_height, 'border-radius': _radius}">
            <div class="donut-in" [ngStyle]="{'width': _inWidth, 'height':_inHeight, 'top':_inTop, 'left':_inLeft, 'border-radius':_inRadius}">
                <p [ngStyle]="{'font':contentFont, 'line-height': _inHeight}">{{content}}</p>
            </div>
            <div class="donut-filt" [ngStyle]="{'width': _halfWidth, 'height': _height}">
                <div class="donut-center-group" [ngStyle]="{'margin-left': _minusHalfWidth, 'transform':_rotateRight}">
                    <div class="donut-center-container">
                        <div class="donut-center" [ngStyle]="{'width': _width, 'height':_height, 'border-radius':_radius, 'margin-right':_minusHalfWidth, 'background-color':color}"></div>
                    </div>
                </div>
            </div>
            <div class="donut-filt left" [ngStyle]="{'width': _halfWidth, 'height': _height}">
                <div class="donut-center-group" [ngStyle]="{'margin-right': _minusHalfWidth, 'transform':_rotateLeft}">
                    <div class="donut-center-container">
                        <div class="donut-center" [ngStyle]="{'width': _width, 'height':_height, 'border-radius':_radius, 'margin-left':_minusHalfWidth, 'background-color':color}"></div>
                    </div>
                </div>
            </div>
        </div>
        <p class="donutName" [ngStyle]="{'font': nameFont}">{{name}}</p>
    </div> 
    `,
    styles: [`
        .donutName{
            text-align: center;
            width: 100%;
        }
        .donut{
            display:inline-block;
        }
        .donut-out {
            border: none;
            box-shadow: 0 0 6px #97FFFF inset;
            position: relative;
        }

        .donut-center {
            border: none;
        }

        .donut-center-group {
            width: 200%;
            height: 100%;
        }

        .donut-center-container {
            width: 50%;
            height: 100%;
            margin-right: auto;
            margin-left: 0;
            overflow: hidden;
        }

        .donut-in {
            position: absolute;
            border: none;
            box-shadow: 0 0 6px #97FFFF;
            background-color: white;
            z-index: 3;
        }
        
        .donut-in>p{
            margin: auto;
            height: 100%;
            text-align: center;
        }

        .donut-filt {
            overflow: hidden;
            position: absolute;
            right: 0;
        }

        .donut-filt.left {
            left: 0;
        }

        .donut-filt.left>.donut-center-group {
            margin-left: 0;
        }

        .donut-filt.left>.donut-center-group>.donut-center-container {
            margin-left: auto;
            margin-right: 0;
        }

        .donut-filt.left>.donut-center-group>.donut-center-container>.donut-center {
            margin-right: 0;
        }
    `]
})
export class RRRDonut implements OnInit{   
    @Input()
    width:number = 100;
    @Input()
    donutWidth: number = 10;
    @Input()
    value:number = 100;
    @Input()
    maxValue:number = 100;
    @Input()
    content:string;
    @Input()
    name:string;
    @Input()
    contentFont:string = '24px 微软雅黑';
    @Input()
    nameFont:string = '24px 微软雅黑';
    @Input()
    color:string = 'blue';

    _width:string;
    _height:string;
    _radius:string;
    _inWidth:string;
    _inHeight:string;
    _inRadius:string;
    _inTop:string;
    _inLeft:string;
    _halfWidth:string;
    _minusHalfWidth:string;
    _rotateRight:string;
    _rotateLeft:string;

    constructor(){}

    ngOnInit(): void {
        this._width = this.width.toString() + 'px';
        this._height = this._width;
        this._radius = (this.width/2).toString() + 'px';
        this._inWidth = (this.width-(this.donutWidth*2)).toString() + 'px';
        this._inHeight = this._inWidth;
        this._inRadius = ((this.width/2)-this.donutWidth).toString()+ 'px';
        this._inTop = (this.donutWidth).toString() + 'px';
        this._inLeft = (this.donutWidth).toString() + 'px';
        this._halfWidth = (this.width/2).toString() + 'px';
        this._minusHalfWidth = (-this.width/2).toString() + 'px';
        this.calcuRotate();
        
    }

    calcuRotate(){
        let percent:number = Math.min(1, this.value/this.maxValue);
        if(percent <= 0.5){
            let angle = 360*percent;
            this._rotateRight = 'rotate(' + angle + 'deg)';
            this._rotateLeft = 'rotate(0deg)';
        }
        else{
            let angle = 360*(percent-0.5);
            this._rotateRight = 'rotate(180deg)';
            this._rotateLeft = 'rotate(' + angle + 'deg)';
        }
    }
    
}

/**进度条 */
@Component({
    selector: 'rrr-progress',
    template: `
        <div>
            <div class="col-xs-2 progress-name">{{name}}</div>
            <div class="col-xs-9 progress">
                <div class="progress-bar" role="progressbar" aria-valuemin="0" [attr.aria-valuemax]="maxValue" [attr.aria-valuenow]="value" [ngStyle]="{'width': value+'%'}">{{content}}</div>
            </div>
            <div class="col-xs-1 progress-result">{{result}}</div>
        </div>
    `,
    styles: [`
        .progress{
            padding: 0;
        }
        .progress-name{
            text-align: right;
            padding-right: 2px;
        }
        .progress-result{
            padding-left: 2px;
        }
    `]
})
export class RRRProgress implements OnInit{

    private width:string;

    @Input()
    name:string;

    @Input()
    maxValue:number = 100;

    @Input()
    value:number = 0;

    @Input()
    content:string;

    @Input()
    result:string;

    ngOnInit(): void {
    }

}



