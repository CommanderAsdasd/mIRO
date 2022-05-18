glsl.presets = `

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Autechre
@ // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
float k = MY*0.25;
vec2  uvd = mix(
            uv2dspmd(uv,f2z(img.r)*k,f2z(img.b)*k),
            uv2wtr(uv,f2z(img.r)*k,f2z(img.b)*k,MLS),
            f2f(B-C));
vec4  imd = texture2D(TXB, uvd);

      k = MX;
vec2  uvn = mix(
            uv2dspmd(uv,f2z(imd.r)*k,f2z(imd.b)*k),
            cnv2abs(uv2wtr(uv,f2z(imd.r)*k,f2z(imd.b)*k,MLS)),
            B);
vec4  imn = texture2D(TXB, uvn);
float e = f2slit(img2bw(img),0.5,0.05,0.05);
      img.g = sin(img.g * TWO_PI*(0.5+MX));
      if(MY<0.5) img.g = abs(img.g);

vec4  ima = mix2scr(imn,vec4(vec3(e),1.0),1.0);
vec4  imb = mix2scr(imn,img.ggga,mix(0.5,0.1,C));

vec4  imo = mix(imd, ima, A);
      imo = mix(imo, imb, B);

      gl_FragColor = imo;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Bluejuice
@ // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

float k = (1.0-MX)*0.6;
vec4  imb = texture2D(TXB, uv);
vec2  uvp = cnv2abs(uv2p(
        uv2dspmd(uv,imb.r*k,imb.g*k),
        MY*0.5 ));
vec4  img = texture2D(TXP, uvp);

      k*=0.5;
vec4  imp = texture2D(TXP, cnv2abs(uv2p(
        uv2dspmd(uv,imb.r*k,imb.g*k),
        MY*f2z(img.g) )));
      imp.rgb = rgb2ht(imp.rgb,imp.g);
      imp.rgb = mod(rgb2lt(imp.rgb,img.r),1.0);

vec2  uvo = mix(
        cnv2mod(uv2exp(uv,f2z(imp.r),f2z(imp.g),f2z(imp.b))),
        cnv2mod(uv2mrr(uv,imp.rgb,f2z(imp.g),f2z(imp.b))), A);
vec4  imo = texture2D(TXP,uvo);

vec4  imj = texture2D(TXP, uv);
      imj.g = f2f(sin( imj.g * TWO_PI * (0.5+MY) ));
      imo = mix(imo, mix2scr(imj.ggga,imo,1.0), B);

      gl_FragColor = imo;
      
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Chromeo
@ // v3

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec2  uv2 = uv;
      uv2.x = mix(uv.x, abs(0.5-uv.x), A);

vec4  imc = texture2D(TXB, uv2);
float k = 0.0+(1.0-MY)*3.0;

vec4  imd = texture2D(TXP, uv2dspmd(cnv2abs(uv),imc.r*k,imc.g*k));
vec4  imb = texture2D(TXP, uv2dspmd(cnv2abs(uv),imc.b*k,imc.r*k));

      gl_FragColor = mix2scr(imb,imd,1.0);


`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Deerhoof
@ // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  ims = texture2D(TXP, uv);
vec4  img = texture2D(TXP, 
      cnv2mod(uv2brl(
        uv2mrr(uv,ims.rgb,0.0,MX),
        (1.0-MX)*3.0)
      *3.0*MY));
        
vec4  imo = texture2D(TXP, uv);
      imo.g = sin(imo.g * TWO_PI*(0.5+MX));
      imo.g = mix(imo.g,abs(imo.g),A);
      imo = mix(ims,img,imo.g);
      
      img = texture2D(TXP, uv2p(uv,0.01*(1.0-MY)));
vec4  imr = texture2D(TXP, 
      cnv2mod(uv2p(uv2brl(
          uv2mrr(uv,img.rgb,0.0,MX),
          (1.0-MX)*3.0),
        0.03) ));
      
vec4  imc = texture2D(TXP, uv);
float k = 1.0+(1.0-MY)*3.0;
vec4  imd = texture2D(TXP, uv2dspmd(cnv2abs(uv),imc.r*k,imc.g*k));
      imd = mix2sfl(imd,imr,1.0);
      imo = mix(imo,imd,B);

      gl_FragColor = imo;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

EU
@ // v1

vec2  uv = vTexCoord;
      uv.y = 1.0 - uv.y;
  
float timer = MX*PI;
  
vec4  q1 = texture2D( TXP,  vec2( uv.x*0.5,      uv.y*0.5    ) );
vec4  q2 = texture2D( TXP,  vec2( uv.x*0.5+0.5,  uv.y*0.5    ) );
vec4  q3 = texture2D( TXP,  vec2( uv.x*0.5,      uv.y*0.5+0.5) );
vec4  q4 = texture2D( TXP,  vec2( uv.x*0.5+0.5,  uv.y*0.5+0.5) );

vec4  w1 = mix(q1,q2,smoothstep( abs(sin(timer*0.4))-0.1 , abs(sin(timer*0.4))+0.1 , vec4(q2.g,q2.g,q2.g,1.0) ));
vec4  w2 = mix(q2,q3,smoothstep( sin(sin(timer*0.5))-0.1 , abs(sin(timer*0.5))+0.1 , vec4(q3.g,q3.g,q3.g,1.0) ));
vec4  w3 = mix(q3,q4,smoothstep( abs(sin(timer*0.6))-0.1 , abs(sin(timer*0.6))+0.1 , vec4(q4.g,q4.g,q4.g,1.0) ));
vec4  w4 = mix(q4,q1,smoothstep( abs(sin(timer*0.7))-0.1 , abs(sin(timer*0.7))+0.1 , vec4(q1.g,q1.g,q1.g,1.0) ));

vec4  img_output;

vec4  qt = 1.0-(1.0-q1)*(1.0-q2)*(1.0-q3)*(1.0-q4);

      if (A == 1.0 && B == 1.0 && C == 1.0) img_output = max(max(q1,q2),max(q3,q4));
else  if (A == 1.0 && B == 1.0 && C == 0.0) img_output = mix(q1,q2,max(q3,q4));
else  if (A == 1.0 && B == 0.0 && C == 1.0) img_output = mix(q1,q2,smoothstep(0.4,0.6,vec4(q3.r,q3.r,q3.r,1.0)));
else  if (A == 1.0 && B == 0.0 && C == 0.0) img_output = max(max(w1,w3),max(w2,w4));
else  if (A == 0.0 && B == 1.0 && C == 1.0) img_output = mix(w1,w2,max(w3,w4));
else  if (A == 0.0 && B == 1.0 && C == 0.0) img_output = mix(w1,w2,smoothstep(0.4,0.6,vec4(w3.r,w3.r,w3.r,1.0)));
else  if (A == 0.0 && B == 0.0 && C == 1.0) img_output = qt;
else  if (A == 0.0 && B == 0.0 && C == 0.0) img_output = dot(qt.rgb, vec3(0.33333))>0.5 ? (qt-0.01)*(qt-0.01)*(qt-0.01) : 1.0 - 3.0*(1.0-qt)*(1.0-qt)*(1.0-qt);

      gl_FragColor = img_output;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Floex
@ // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXF, uv);
      img.rgb = mix(
        vec3(0.5,0.7,0.8),
        vec3(1.0),
        1.0-img.g);
        
vec4  imt = img;
      img.rgb = rgb2ht(
        img.rgb,
        f2z(mix(
          MY*0.5,
          R1*1.1,
          A
        ))
      );
      
vec4  im2 = texture2D(TXP, uv);
float mxv = f2slit(im2.g,MX,MY*0.3,0.1);
      img.rgb = mix(img.rgb,im2.rgb,mxv);
      
float k = 10.0*R1+1.0;
vec4  imb = texture2D(TXB, uv);
      mxv = mod(im2.g/imb.g,1.0/k)*k;
      imt.rgb = mix(imt.rgb,im2.rgb,mxv);
      
      gl_FragColor = mix(img,imt,B);

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Goto80 
@ // v8.2

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;

vec4  imb = texture2D(TXB, uv);

float p = MY*0.5*mix(1.0,imb.r,C)*mix(1.0,0.01,B);
      imb.rgb *= mix(
        1.0/p*distance(uv2p(uv,p).y,uv.y-p*0.5*H2W),
        1.0/p*distance(uv2p(uv,p).x,uv.x-p*0.5), A);
vec2  uvd = mix(
        uv2exp(uv,0.0,0.0,imb.g),
        uv2exp(uv,0.0,imb.g,0.0), A);
vec4  imd = tx2d(TXP, uvd);//cnv2abs(uvd));
      imb = texture2D(TXB, uv);
      imd = mix(imb,imd,a2cnv(uvd));

      gl_FragColor = imd; 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Hexstatic
@ // v2

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));
vec4  img = texture2D(TXP, uv);

float speed = 0.01*mix(-MY,MY,A);
float k = mix(0.0,0.01*(1.0-MX),B);
vec2  uvf = uv2exp(uv, speed, f2z(N1)*speed, f2z(N2)*speed );

      uvf = mix(
        uvf, 
        vec2(0.0,0.0),
        f2f( 
          step(uvf.x,0.0)+step(uvf.y,0.0)+
          step(1.0,uvf.x)+step(1.0,uvf.y)) );

vec4  imf = texture2D( TXF, uv2dspmd(uvf,sin(img.r*TWO_PI)*k,sin(img.b*TWO_PI)*k) );

vec2  uva = uv+vec2(f2z(R2),f2z(R3))*R1*0.3;
      uva = cnv2mod(uva);
vec4  ima = texture2D( TXP,  uva );

float mask = f2slit ( img2avg(ima), R1, R2*0.05, R2*0.05 );
      mask += mix( 0.0, step(0.97, f2rand(img.r+N1))*N2, 1.0);
  
      img.rgb = mix(imf.rgb,img.rgb,mask);
      img.a = mix(1.0,mask,C);
  
      gl_FragColor = img;
      
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Interpol
@ // v4

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;

float s = 0.1*MY;

vec2  r = vec2(R1,R2);

vec4  imr = tx2d(TXP,r);
vec3  c = rgb2hsb(imr.rgb);

vec2  shft = vec2(mod(c.r+MX,1.0),1.0-c.b);

vec2  uvs = uv+r-shft;
vec4  img = texture2D(TXP, cnv2abs(uvs));

      img.a = f2slit(uv.x,shft.x,s,mix(0.0,s*0.1,B))*f2slit(uv.y,shft.y,s*H2W,mix(0.0,s*0.1*H2W,B));

      gl_FragColor = img; 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Jetone
@ // v2

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

float k2 = (1.0-MY)*0.2;
vec2  uv2 = uv2p(uv,k2);
vec4  img2 = texture2D(TXP, uv2);

vec2  uv3 = uv2p(uv,sin(uv2.x+MX)*cos(uv2.y+MY)*k2);
      uv3 = uv2p(uv,  mod(img2.r,0.1)*10.0*k2+0.02);
      uv3.y = mix(uv3.y,uv.y,A);
vec4  img3 = texture2D(TXP, uv3);

float k4 = 0.9;
vec4  img4 = texture2D(TXP, uv2exp(uv,0.5,f2z(img3.r)*k4,f2z(img3.b)*k4));

vec4  imo = mix(img3,img4,A);

      img2.rgb = mod(img2.rgb,0.1)*10.0;
      
      uv3 = uv2p(uv,  img2.r *k2+0.04);
      img3 = texture2D(TXP, uv3);
      img3.rgb = mod(img3.rgb,0.2)*5.0;
      
      k4 = MX*0.5;
float kz = f2z(img2.g)*MY;
vec2  uv4 = uv2exp(uv, kz, f2z(img3.r)*k4, f2z(img3.b)*k4*0.5);
      uv4.x = mod(uv4.x,1.0);
      img4 = texture2D(TXP, uv4);
      
      imo = mix(imo,img4,B);
      imo = mix2sfl(imo,img4,C);

      gl_FragColor = imo;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Klaxons
@ // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);
float k = MY*0.25;
vec4  img = texture2D(TXF, uv);
vec4  imb = texture2D(TXB, cnv2abs(uv2exp(uv,f2z(img.g)*k,f2z(img.r)*k,f2z(img.b)*k)));
      k = (1.0-MX)*0.5;
vec4  imn = texture2D(TXP, cnv2abs(uv2wtr(uv,f2z(imb.r)*k,f2z(imb.b)*k,MLS)));
float e = f2slit(img2bw(img),0.5,0.01,0.05);
      gl_FragColor = mix2scr(imn,vec4(vec3(e),1.0),1.0);

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Locussolus
@ // v2

vec2  uv = vTexCoord;
      uv.y = 1.0 - uv.y;

vec4  imb = texture2D(TXB, uv);

float kx = H2W;
vec2  uvc = uv;
      uvc = uvc-vec2(0.5,0.5);
      uvc.x*= kx;  
      uvc = mix(uv2rot(uvc,PI*0.5),uvc,A);			

vec2  uvr = xy2md(uvc); 
      uvr.y/=TWO_PI;
      uvr = cnv2abs(uvr*2.0);

vec2  uvd = mix(uvr,cnv2abs(uv2tr(uvr,vec2(0.0),f2z(imb.r),1.0)),C);

vec4  imd = texture2D(TXP, uvd);

      gl_FragColor = imd; 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Monolake
@ // v10

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));
vec4  imb = tx2d(TXB,uv);

vec2  uvs = vec2(uv.x,MY);
float k = f2z(MX)*3.5*imb.b;
      uvs.x = mix(uv.x,uv2dspxy(uvs, imb.r*k,imb.b*k).x,A);
vec4  img = texture2D(TXP, mix(cnv2mod(uvs),mix(cnv2mod(uvs),uv,step(R4,0.5)),B));
      img.a = f2slit(uvs.x,R1,0.1,0.1*imb.g)
      *sin(uv.x*PI);

vec2  uvd = vec2(MX,uv.y);
vec4  imd = tx2d(TXP,uvd);
      imd.a = f2slit(uv.y+f2z(imb.r)*0.1,R5,0.01*R2,0.01*R2)
      * f2slit(uv.x,R4,R3,0.1);

      gl_FragColor = mix(img,mix(img,imd,imd.a),C); 
      
`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Neu
@ // v2

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  imc = texture2D(TXP, uv);
vec4  imf = texture2D(TXF, uv);
      imf.g = 1.0-imf.g;
      imc.g = mix(
        sin(imc.g*TWO_PI*(0.5+MX)),
        sin((imc.g+imf.g)*PI*(0.5+MX)),
        C);
      imc.g = mix(imc.g,abs(imc.g),A);

vec4  img = texture2D(TXP, uv);
      img.rgb=rgb2hsb(img.rgb);
      img.rgb = sin(img.rgb*vec3(TWO_PI*(0.5+MX)));
      img.g = mix(1.0-img.g, abs(1.0-img.g-imf.g), C);

      gl_FragColor = mix(imc.ggga,img.bbbg,B);

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Oval
@ // v2

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  imb = texture2D(TXB, uv);
vec4  img = texture2D(TXP, cnv2abs(uv+imb.rb-vec2(0.5)));

float bw = img2avg(imb);
float k = MY*6.0*pow(abs(MX-bw),2.0);
vec4  ima = texture2D(TXP, uv2dspmd(cnv2abs(uv),f2z(imb.r)*k,f2z(imb.g)*k));

vec4  imp = texture2D(TXB, uv2p(uv,0.2*imb.r));
      k = 1.0-MY;
vec4  imz = texture2D(TXP, cnv2abs(uv2dspmd(uv,f2z(imp.r)*k,f2z(imp.b)*k)));

vec4  imo = mix(mix(img,ima,A),imz,B);

      gl_FragColor = imo;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Periskop
@ // v3

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
			
float kz = 1.0 - MY;
vec2  uvz = uv2exp( uv, 1.0-kz*kz, 0.0, 0.0);
vec4  imz = texture2D(TXP, uvz );

float kr = mix(0.0,mix(MX,1.0,B),abs(A-B));
vec2  uvt = (uv-0.5+kr*0.5)/kr;
vec4  img = texture2D(TXP, uvt);

float c = MX;
float a = 1.0-f2slit(uv.x,0.5,MX,mix(0.0,c,C))*f2slit(uv.y,0.5,MX,mix(0.0,c,C));
      a = mix(a2cnv(uvt),a,B);
      gl_FragColor = mix(imz,img,a); 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Q-Tip
@ // v1

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));
vec4  img = texture2D(TXP, uv);

float rndX =  R1 ; float rndY =  R2 ;
float aimX =  R3 ; float aimY =  R4 ;

float time5 = mix(R5,FRC,A);
      
vec2  uv0 = 1.0 - uv;
vec2  uv2 = vec2(cos(time5),sin(time5)) + ( uv0-vec2(cos(time5),sin(time5)) ) / sin(time5);

float ang1 = mix(0.0,TWO_PI*R1,C);
mat2  rot1 = mat2( 
            cos(ang1) , -sin(ang1) ,
            sin(ang1) ,  cos(ang1) );

float ang2 = mix(0.0,TWO_PI*R2,C);
mat2  rot2 = mat2( 
            cos(ang2) , -sin(ang2) ,
            sin(ang2) ,  cos(ang2) );

vec4  img0 = texture2D(TXP, uv2 * rot1);
vec4  img1 = texture2D(TXP, vec2( rndX, rndY ));

float xShift = (img0.r*2.0-1.0) * aimX * cos(time5);
float yShift = (img0.g*2.0-1.0) * aimY * sin(time5); 

vec4  img_out = texture2D(TXP, abs(1.0-abs(uv0*sin(time5) +vec2(xShift,yShift))) * rot2  );

float avg = dot(img_out.rgb, vec3(0.33333));
float isin = (sin(time5))*0.5+0.5;
float thr = smoothstep(isin,isin+0.05,avg)-smoothstep(isin+0.25,isin+0.30,avg);

      img_out = mix( vec4(img1.rgb,thr*0.65), img_out, step(R1+0.5,B) );

      gl_FragColor = img_out; 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Royksopp
@ // v8

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
vec4  img = texture2D(TXP, uv);
vec4  imb = tx2d(TXB, uv);

float k = 0.02;
vec2  uvf = uv2dspmd(uv, f2z(imb.r)*k, imb.b*PI);
      uvf = cnv2abs(uvf);

vec4  imf = tx2d(TXF, uvf);
      imf.rgb = imf.rgb*mix(1.0,mix(0.9,1.1,B),A);

float b = img2bw(img);
float a = smoothstep(0.3,0.6,b);

vec4  imo = mix(imf,img,mix(a,1.0-a,B));
      gl_FragColor = imo; 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Sevish
@ // v2

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));
vec4  img = texture2D(TXP, uv);

float h = 0.2*MY;
      img.a = mix(
        f2slit(img2avg(img),z2f(sin(FRC)),h,h),
        f2slit(img2avg(img),R1,h*0.5,h*0.5), A);
				
      gl_FragColor = img; 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Timewriter
@ // v6

vec2  uv  = vec2(vTexCoord.x, (1.0-vTexCoord.y));

float z = 2.0+R3*10.0;

float ang = R4*TWO_PI;

vec2  uvz = uv*z-vec2(R1*z,R2*z)+vec2(0.5);

uvz.y /= H2W;
float k = 5.0 * B;
vec2  uvr = uvz * mat2(cos(ang+N1*k) , -sin(ang+N2*k) ,sin(ang+N3*k) ,  cos(ang+N4*k) );

uvr.y *= H2W; uvz.y *= H2W;

vec2  uvf = mix(uvz, uvr, A);

      uvf = uv2wtr(uvf,0.1*k*f2z(R3),0.1*k*f2z(R4),MLS);

float a = step(uvf.x,1.0)*step(uvf.y,1.0)*step(0.0,uvf.x)*step(0.0,uvf.y);

vec4  img = texture2D(TXP, uvf);

      a = mix(a, a * f2slit( img2avg(img), R5, 0.3 , 0.1 ), C );
      img.a = a;

      gl_FragColor = img; 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Uffie
@ // v7

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
			
vec4  imb = tx2d(TXB,uv);
float ky = mix(f2z(MY),0.0,C);
float kx = mix(f2z(MX),0.0,C);
float kd = distance(uv/vec2(1.0,H2W),vec2(0.5+kx,0.5/H2W+ky))+ky;
      uv.y = mix(kd,1.0-kd,A);
      uv = mix(uv,cnv2abs(uv2rot(uv,MY*f2z(imb.r))),C);
vec4  img = texture2D(TXP, cnv2abs(uv));

      gl_FragColor = img; 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Vibravoid
@ // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
float pwr = 1.0-clamp(MY*2.0,0.0,1.0);
      img = texture2D(TXP, uv2dspmd(uv, img.r*pwr, img.b));
vec4  im2 = img;

      img.rgb = abs(img.rgb-vec3(0.5));
      img.rgb*= vec3(4.0);
      img.rgb = mod(img.rgb,vec3(1.0));
      img.rgb = rgb2hsb(img.rgb);

      im2.rgb = rgb2hsb(im2.rgb);
      im2.rgb = sin(im2.rgb*vec3(PI));

float mxv = im2.g;

vec4  imf = texture2D(TXF,uv);
      imf.g = 1.0-step(0.5,imf.g);
      img = mix(img,imf.ggga,mxv).rgba;
      img.rgb = rgb2ht(img.rgb,MX);
      img.rgb = mix(img.rgb,abs(vec3(0.5)-img.rgb)*vec3(2.0),A);
			
      gl_FragColor = img;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Workshop
@ // v1

vec2  uv = vec2(vTexCoord.x, 1.0-vTexCoord.y);

vec2  uvt = vec2(R1<0.4 ? uv.x : mod(uv.x,R4*0.1    )+R2,
      R1>0.6 ? uv.y : mod(uv.y,R4*0.1*H2W)+R3);
vec4  img = texture2D( TXP, uvt );
float s = R4*0.05 + 0.01;
vec2  uvp = vec2(uv.x-mod(uv.x,s), uv.y-mod(uv.y,s*H2W));
float imp = img2avg(texture2D( TXP, uvp ));
float lvl = img2avg(texture2D( TXP, vec2(R2,R3) ));
      s = R5*0.15;
      img.a = f2slit ( imp, lvl, s, s );
      img.a = clamp( img.a - f2slit ( img2avg(img), lvl, s, s ), 0.0,1.0);

      gl_FragColor = img;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Xenakis
@ // v10

vec2  uv = vTexCoord; 
      uv.y = 1.0 - uv.y;
			
vec4  imc = texture2D(TXP, uv);
vec4  imb = texture2D(TXB, uv);
float v = (1.0-distance(uv.y,0.5)*2.0);
float k = 0.25*v;

vec2  uvh = vec2(uv.x,MY);
      
      uvh.x = uv2dspxy(uvh,f2z(imc.r)*k,f2z(imc.b)*k).x;
      uvh.x += (uv.y*f2z(R1) + R2)/H2W;
      uvh = uv2dspmd(uvh,f2z(imb.r)*B,f2z(imb.b)*B);
      
vec4  imh = texture2D(TXP, cnv2mod(uvh));
      imh.a *= f2slit(img2avg(imh),R2,0.1,0.1);
      if (R3>MX*(1.0-A)) imh.rgb = imc.rgb;

      gl_FragColor = imh; 

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Yage
@ // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
      img.rgb = mix(img.rgb,clamp(img.rgb,vec3(0.2),vec3(1.0)),B);
      img.rgb = img.rgb*vec3(0.5)+vec3(0.25);
      img.rgb = rgb2hsb(img.rgb);
      img.g = 1.0 - img.g;
float t = img.g;
      img.g = (img.g-0.5)*1.5;
      img.g = mix(img.g, 1.0 - img.g, A);
vec4  imo = img.ggga;

      img.g = (t-0.6)*(1.7);
      img.g = mix(img.g, 1.0 - img.g, A);
      img.rgb = img.gbg;
      img.g *= img.r * (1.0 + MY);
      img.rgb = rgb2ht(img.rgb,MX);

      imo = mix(imo,img,C);
      
      gl_FragColor = imo;

`+/*-------------------------------------------------------------------------------------------------------*/`###`+`

Zeebox
@ // v1

vec2  vtc = vTexCoord;
vec2  uv  = vec2(vtc.x, 1.0-vtc.y);

vec4  img = texture2D(TXP, uv);
      img.rgb *= vec3(5.0);
      img.rgb = mod(img.rgb,vec3(1.0));
			
float a = img2avg(img);
      a = step(a,0.5);
      img.rgb = mix(vec3(a),1.0-vec3(a),B);
			
vec4  imf = texture2D(TXF, uv);
      img.rgb = mix(img.rgb, img.rgb + vec3(1.0-imf.rgb),B);
      imf.g = 1.0 - (img.g + imf.g);
vec4  imo = mix(img,imf.ggga,A);

      gl_FragColor = imo;

`+/* -------------------------- END OF PRESETS LIST -------------------------- */``;