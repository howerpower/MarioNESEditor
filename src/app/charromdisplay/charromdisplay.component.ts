import { Component,AfterViewInit, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { SpritesData, ROMMetaData, SingleSprite} from '../processrawchararray.service';

@Component({
  selector: 'app-charromdisplay',
  templateUrl: './charromdisplay.component.html',
  styleUrls: ['./charromdisplay.component.css']
})
export class CharromdisplayComponent implements AfterViewInit {

  //Descrambling the CHR so you can see *most* of the full sprites
  private _marioCHR =
  [0  ,1  ,8  ,9  ,16 ,17 ,24 ,25 ,32 ,33 ,8  ,9  ,8  ,9  ,8  ,9  ,
   2  ,3  ,10 ,11 ,18 ,19 ,26 ,27 ,34 ,35 ,40 ,41 ,10 ,11 ,10 ,11 ,
   4  ,5  ,12 ,13 ,20 ,21 ,28 ,29 ,36 ,37 ,42 ,43 ,46 ,47 ,12 ,48 ,
   6  ,7  ,14 ,15 ,22 ,23 ,30 ,31 ,38 ,39 ,44 ,45 ,44 ,45 ,49 ,45  ,
   50 ,51 ,58 ,55 ,50 ,65 ,50 ,51 ,0  ,1  ,58 ,55 ,8  ,9  ,8  ,9  ,
   52 ,53 ,59 ,60 ,66 ,67 ,70 ,71 ,76 ,77 ,79 ,79 ,40 ,41 ,10 ,11 ,
   54 ,55 ,61 ,62 ,50 ,51 ,50 ,51 ,74 ,74 ,112,113,42 ,43 ,12 ,13 ,
   56 ,57 ,63 ,64 ,68 ,69 ,72 ,73 ,75 ,75 ,114,115,92 ,93 ,94 ,95 ,
   81 ,82 ,83 ,8  ,9  ,91 ,96 ,101,118,119,150,151,154,155,122,123,
   84 ,85 ,129,88 ,89 ,97 ,98 ,116,120,121,152,153,156,157,218,219,
   86 ,87 ,128,90 ,90 ,99 ,100,117,131,130,296,297,126,127,216,216,
   256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,
   272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,
   288,289,290,291,292,293,294,295,178,179,182,179,158,185,184,242,
   292,160,292,165,105,165,107,160,180,181,183,181,159,187,186,189,
   161,162,166,167,106,167,108,162,170,171,174,175,240,188,241,188,
   163,164,168,169,168,169,163,164,172,173,176,177,50 ,51 ,58 ,55 ,
   205,125,124,125,124,213,212,109,110,102,103,104,144,145,146,147,
   206,209,140,137,136,227,226,111,111,208,214,141,224,339,340,292,
   207,211,210,139,138,139,138,239,243,215,217,228,225,341,342,292,
   292,292,191,190,292,292,191,190,292,292,191,190,292,292,191,190,
   196,195,193,192,196,195,193,192,196,195,202,201,196,195,202,201,
   198,197,194,292,198,197,194,292,198,197,194,292,198,197,194,292,
   200,199,292,292,204,203,292,292,200,199,292,292,204,203,292,292,
   292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,
   292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,
   292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,
   292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,
   292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,
   292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,
   292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,
   292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292];

   //Each Array is a full sprite, which is pointed to from 
   //  _marioCHR_toTile below
   private _marioCHR_toSprites = [
   //First Row
   [0,1,
    2,3,
    4,5,
    6,7],
   [8,9,
    10,11,
    12,13,
    14,15],
   [16,17,
    18,19,
    20,21,
    22,23],
   [24,25,
    26,27,
    28,29,
    30,31],
   [32,33,
    34,35,
    36,37,
    38,39],
   [8,9,
    40,41,
    42,43,
    44,45],
   [8,9,
    10,11,
    46,47,
    44,45],
   [8,9,
    10,11,
    12,48,
    49,45],
   //Second Row
   [50,51,
    52,53],
   [58,55,
    59,60],
   [50,65,
    66,67],
   [50,51,
    70,71],
   [0,1,
    76,77,
    74,74,
    75,75],
   [58,55,
    79,79],
   [8,9,
    40,41,
    42,43,
    92,93],
   [8,9,
    10,11,
    12,13,
    94,95],
   //Third Row
   [54,55,
    56,57],
   [61,62,
    63,64],
   [50,51,
    68,69],
   [50,51,
    72,73],
   [112,113,
    114,115],
   //Fourth Row
   [81,82,83],
   [8,9,
    88,89,
    90,90],
    [91],
    [96],
    [101],
   [118,119,
    120,121],
   [150,151,
    152,153],
   [154,155,
    156,157],
   [122,123,
    218,219,
    216,216],
  //FIfth Row
   [84,85,
    86,87],
   [129,292,
    128,292],
    [97],
    [98],
    [116],
  //Sixth Row
    [99],
    [100],
    [117],
    [131,130],
    [131,130],
    [296],
    [297],
    [126,127],
    [126,127],
   //Number/Alphabet
    [256],[257],[258],[259],[260],[261],[262],[263],[264],[265],[266],[267],[268],[269],[270],[271],
    [272],[273],[274],[275],[276],[277],[278],[279],[280],[281],[282],[283],[284],[285],[286],[287],
    [288],[289],[290],[291],[292],[293],[294],[295],
   //Seventh Row
    [178,179,
     180,181],
    [182,179,
     183,181],
    [158,292,
     159,292],
    [185,184,
     187,186,
     188],
     [242],
    [189,292,
     188,292],
  //Eighth Row
    [292,160,
     161,162,
     163,164],
    [292,165,
     166,167,
     168,169],
    [105,165,
     106,167,
     168,169],
    [107,160,
     108,162,
     163,164],
    [170,171,
     172,173],
    [174,175,
     176,177],
     [240],
     [241],
    //Ninth Row
    [50,51,
     144,145],
    [50,51,
     146,147],
    //Tenth Row
    [205,292,
     206,292,
     207,292],
    [125,124,
     209,140,
     211,210],
    [125,124,
     137,136,
     139,138],
    [213,212,
     227,226,
     139,138],
    [109,292,
     111,292],
    [110,292,
     111,292],
     [102],
     [103],
     [104],
  //Eleventh Row
    [208,292,
     215,292],
    [214,292,
     217,292],
    [141,292,
     228,292],
    [224,292,
     225,292],
    [339,340,
     341,342],
  //Twelvth Row
     [239],
     [243], 
  //Bowser Row
     [292,292,191,190,
      196,195,193,192,
      198,197,194,292,
      200,199,292,292],
     [292,292,191,190,
      196,195,193,192,
      198,197,194,292,
      204,203,292,292],
     [292,292,191,190,
      196,195,202,201,
      198,197,194,292,
      200,199,292,292],
     [292,292,191,190,
      196,195,202,201,
      198,197,194,292,
      204,203,292,292],
    ];
    
  // When clicking on the CHR, this maps the tile you clicked to 
  // what needs to be loaded on the canvas
  private _marioCHR_toTile =
  [0  ,0  ,1  ,1  ,2  ,2  ,3  ,3  ,4  ,4  ,5  ,5  ,6  ,6  ,7  ,7  ,
   0  ,0  ,1  ,1  ,2  ,2  ,3  ,3  ,4  ,4  ,5  ,5  ,6  ,6  ,7  ,7  ,
   0  ,0  ,1  ,1  ,2  ,2  ,3  ,3  ,4  ,4  ,5  ,5  ,6  ,6  ,7  ,7  ,
   0  ,0  ,1  ,1  ,2  ,2  ,3  ,3  ,4  ,4  ,5  ,5  ,6  ,6  ,7  ,7  ,
   8  ,8  ,9  ,9  ,10 ,10 ,11 ,11 ,12 ,12 ,13 ,13 ,14 ,14 ,15 ,15 ,
   8  ,8  ,9  ,9  ,10 ,10 ,11 ,11 ,12 ,12 ,13 ,13 ,14 ,14 ,15 ,15 ,
   16 ,16 ,17 ,17 ,18 ,18 ,19 ,19 ,12 ,12 ,20 ,20 ,14 ,14 ,15 ,15 ,
   16 ,16 ,17 ,17 ,18 ,18 ,19 ,19 ,12 ,12 ,20 ,20 ,14 ,14 ,15 ,15 ,
   21 ,21 ,21 ,22 ,22 ,23 ,24 ,25 ,26 ,26 ,27 ,27 ,28 ,28 ,29 ,29 ,
   30 ,30 ,31 ,22 ,22 ,32 ,33 ,34 ,26 ,26 ,27 ,27 ,28 ,28 ,29 ,29 ,
   30 ,30 ,31 ,22 ,22 ,35 ,36 ,37 ,38 ,39 ,40 ,41 ,42 ,43 ,29 ,29 ,
   44 ,45 ,46 ,47 ,48 ,49 ,50 ,51 ,52 ,53 ,54 ,55 ,56 ,57 ,58 ,59 ,
   60 ,61 ,62 ,63 ,64 ,65 ,66 ,67 ,68 ,69 ,70 ,71 ,72 ,73 ,74 ,75 ,
   76 ,77 ,78 ,79 ,80 ,81 ,82 ,83 ,84 ,84 ,85 ,85 ,86 ,87 ,87 ,88 ,
   90 ,90 ,91 ,91 ,92 ,92 ,93 ,93 ,84 ,84 ,85 ,85 ,86 ,87 ,87 ,89 ,
   90 ,90 ,91 ,91 ,92 ,92 ,93 ,93 ,94 ,94 ,95 ,95 ,96 ,87 ,97 ,89 ,
   90 ,90 ,91 ,91 ,92 ,92 ,93 ,93 ,94 ,94 ,95 ,95 ,98 ,98 ,99 ,99 ,
   100,101,101,102,102,103,103,104,105,106,107,108,98 ,98 ,99 ,99 ,
   100,101,101,102,102,103,103,104,105,109,110,111,112,113,113,80,
   100,101,101,102,102,103,103,114,115,109,110,111,112,113,113,80,
   116,116,116,116,117,117,117,117,118,118,118,118,119,119,119,119,
   116,116,116,116,117,117,117,117,118,118,118,118,119,119,119,119,
   116,116,116,116,117,117,117,117,118,118,118,118,119,119,119,119,
   116,116,116,116,117,117,117,117,118,118,118,118,119,119,119,119,
   0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,
   0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,
   0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,
   0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,
   0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,
   0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,
   0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,0  ,
   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  private _scaledtilesize = 32;
  private _ctx;
  private _canvas: HTMLCanvasElement;
  @Input() TileImages: SpritesData;
  @Output() TileSelectChangeEvent = new EventEmitter<SingleSprite[]>();
  private _ChosenTile: SingleSprite;
  private _ChosenSprite: SingleSprite[];
  public get ChosenTile(): SingleSprite{
    return this._ChosenTile
  }
  public get ChosenSprite(): SingleSprite[]{
    return this._ChosenSprite
  }

  constructor() { }

  ngAfterViewInit(): void {
    this._canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this._ctx = this._canvas.getContext("2d");
    this._canvas.width = 16 * this._scaledtilesize;
    this._canvas.height = 512;
  }
  ngOnChanges(changes: SimpleChanges) {
    if ("TileImages" in changes) {
      if(this.TileImages != undefined){
        this.setCanvasSize();
        this.drawTiles();
      }
      
    }
  }
  private setCanvasSize(): void{
    this._canvas.height = (this.TileImages.Sprites.length / 16) * this._scaledtilesize;
  }
  private drawTiles(): void{
    let newcanvas = <HTMLCanvasElement>document.createElement("CANVAS");
    newcanvas.width = 16 * 8;
    newcanvas.height = (this.TileImages.Sprites.length / 16) * 8;
    let newctx = newcanvas.getContext("2d");
    let cursor = { x: 0, y: 0 };
    for (let i = 0; i < this.TileImages.Sprites.length; i++) {
      newctx.putImageData(this.TileImages.Sprites[this._marioCHR[i]].ImgData, cursor.x, cursor.y);
      cursor.x += 8;
      if (cursor.x == 128) {
        cursor.x = 0;
        cursor.y += 8;
      }
    }
    this._ctx.scale(this._scaledtilesize / 8, this._scaledtilesize / 8);
    this._ctx.drawImage(newcanvas, 0, 0);
  }
  OnClick(e) {
    if (this.TileImages != undefined) {
      let pos = this.getMousePos(this._canvas,e);
      let xpos = pos.x; 
      let ypos = pos.y; 
      let row = Math.floor(ypos / this._scaledtilesize);
      let col = Math.floor(xpos / this._scaledtilesize);
      let index = this._marioCHR_toTile[(row * 16) + col];
      this._ChosenSprite = [];
      if (this.TileImages.Sprites.length != 0 && index < this.TileImages.Sprites.length) {
        //this._ChosenTile = this.TileImages.Sprites[index];
        for (var i = 0; i < this._marioCHR_toSprites[index].length; i++) {
          this._ChosenSprite.push(this.TileImages.Sprites[this._marioCHR_toSprites[index][i]]);
        }
        //this._ChosenSprite.push(this.TileImages.Sprites[index]);
        //this._ChosenSprite.push(this.TileImages.Sprites[1]);
        this.TileSelectChangeEvent.emit(this._ChosenSprite);
      }
    }
  }
  getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
          x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
          y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
      };
  }
}
