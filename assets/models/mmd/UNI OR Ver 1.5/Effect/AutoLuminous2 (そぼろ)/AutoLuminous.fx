////////////////////////////////////////////////////////////////////////////////////////////////
//
//  AutoLuminous Ver.2.0
//  �쐬: ���ڂ�
//
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// ���[�U�[�p�����[�^

// �ڂ����͈�
float Extent = 0.0006;

//������̃T���v�����O��
#define SAMP_NUM   5

//�O���A�̈�����̃T���v�����O��
#define SAMP_NUM2  16

//�O���A���x�@1.0�O��
float GlarePower = 1.2;

//����ьW���@0�`1
float OverExposureRatio = 1.0;

//�w�i�F RGBA�e�F0�`1
float4 BackColor = {0,0,0,0};

//�c�����x�@0�`50���x�@0�Ŗ���
#define AFTERGLOW  0


///////////////////////////////////////////////////////////////////////////////////////////////
//�L�[�J���[

//�L�[�J���[�F��臒l
float KeyThreshold = 0.38;

//�L�[�J���[���E0�ŃL�[�J���[����
#define KEYCOLOR_NUM  0 //2

#if KEYCOLOR_NUM!=0
    float3 KeyColors [KEYCOLOR_NUM][3] = {
        //{{�L�[�F},{�R�A�F},{�����F}}, �̂悤�ɕ��ׂ܂�
        //�K�� KEYCOLOR_NUM �Ŏw�肵�����������ׂ܂�(0������)
        {{1, 0, 1}, {0.2, 0.2, 0.1}, {0.8, 0.5, 0.3}},
        {{0, 0, 1}, {1.0, 0.8, 1.0}, {0.2, 0.4, 1.0}},
        
    };
#endif

///////////////////////////////////////////////////////////////////////////////////////////////
//�I�v�V�����X�C�b�`

//�ҏW���̓_�ł��t���[�����ɓ���������
//true���ƃt���[�����ɉ����Č��̋������ω�
//false���ƕҏW�����_�ł������܂�
#define SYNC false

//�������O�}�X�N���g�p����
//MME�^�u�� AL_MaskRT ������܂��B
//�ڂ����g������Readme�㋉�҂ɂāB
#define MASK_ENABLE  0

//�g�[���J�[�u�̓K�p������
//0���I�t�A1���I���ł�
//ToneCurve.x��ǂݍ��ނ̂��ʓ|�ł���΃I���ɂ��܂�
#define SCREEN_TONECURVE  0

//�O���A���P���������������܂�
//0���I�t�A1���I���ł�
//�O���A�̃T���v�����O��������ɉ����đ��₵�܂�
#define GLARE_LONGONE  0

//�����A���t�@�o�̓��[�h
//MMD��ł̕\���͂��������Ȃ�܂����A�����摜�o�͂Ƃ��Ă�
//�����ɐ������A���t�@�t���f�[�^�������܂�
//0���I�t�A1���I���ł�
#define ALPHA_OUT  0

//MMD��̕`���HDR���Ƃ��Ĉ����܂�
//���邳��1�𒴂��������������Č�����悤�ɂȂ�܂�
//0���I�t�A1���I���ł�
#define HDR_RENDER  1

//��Ɨp�o�b�t�@�̃T�C�Y�𔼕��ɂ��Čy�����܂�
//�掿�͗����܂�
//0���I�t�A1���I���ł�
#define HALF_DRAW  0


//�e�N�X�`���t�H�[�}�b�g
//#define AL_TEXFORMAT "D3DFMT_A32B32G32R32F"
#define AL_TEXFORMAT "D3DFMT_A16B16G16R16F"


////////////////////////////////////////////////////////////////////////////////////

#if HALF_DRAW==0
    #define TEXSIZE1  1
    #define TEXSIZE2  0.5
    #define TEXSIZE3  0.25
    #define TEXSIZE4  0.125
#else
    #define TEXSIZE1  0.5
    #define TEXSIZE2  0.25
    #define TEXSIZE3  0.125
    #define TEXSIZE4  0.0625
#endif

///////////////////////////////////////////////////////////////////////////////////////////////
// �����˃I�u�W�F�N�g�`���

texture AL_EmitterRT: OFFSCREENRENDERTARGET <
    string Description = "EmitterDrawRenderTarget for AutoLuminous.fx";
    float2 ViewPortRatio = {TEXSIZE1,TEXSIZE1};
    float4 ClearColor = { 0, 0, 0, 1 };
    float ClearDepth = 1.0;
    bool AntiAlias = true;
    int MipLevels = 0;
    string Format = AL_TEXFORMAT;
    string DefaultEffect = 
        "self = hide;"
        "*Luminous.x = hide;"
        "ToneCurve.x = hide;"
        
        //------------------------------------
        //�Z���N�^�G�t�F�N�g�͂����Ŏw�肵�܂�
        
        
        
        //------------------------------------
        
        "* = AL_Object.fxsub;" 
    ;
>;


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//����ȍ~�̓G�t�F�N�g�̒m���̂���l�ȊO�͐G��Ȃ�����

sampler EmitterView = sampler_state {
    texture = <AL_EmitterRT>;
    MinFilter = Linear;
    MagFilter = Linear;
    MipFilter = Point;
    AddressU  = Clamp;
    AddressV = Clamp;
};

////////////////////////////////////////////////////////////////////////////////////////////////
// �}�X�N�`���

#if MASK_ENABLE!=0
    
    texture AL_MaskRT: OFFSCREENRENDERTARGET <
        string Description = "MaskDrawRenderTarget for AutoLuminous.fx";
        float2 ViewPortRatio = {1.0,1.0};
        float4 ClearColor = { 0, 0, 0, 0 };
        float ClearDepth = 1.0;
        bool AntiAlias = true;
        int MipLevels = 1;
        string Format = "D3DFMT_A8";
        string DefaultEffect = 
            "self = hide;"
            "* = hide;" 
        ;
    >;

    sampler MaskView = sampler_state {
        texture = <AL_MaskRT>;
        MinFilter = Linear;
        MagFilter = Linear;
        MipFilter = None;
        AddressU  = Clamp;
        AddressV = Clamp;
    };

#endif

////////////////////////////////////////////////////////////////////////////////////////////////

int LoopIndex = 0;


#define PI 3.14159

float Script : STANDARDSGLOBAL <
    string ScriptOutput = "color";
    string ScriptClass = "scene";
    string ScriptOrder = "postprocess";
> = 0.8;


// �}�e���A���F
float4 MaterialDiffuse : DIFFUSE  < string Object = "Geometry"; >;
static float alpha1 = MaterialDiffuse.a;

float4x4 matWorld : CONTROLOBJECT < string name = "(self)"; >; 
static float pos_y = matWorld._42;
static float pos_z = matWorld._43;

static float OverLight = (pos_y + 100) / 100;

float Power2 <
   string UIName = "Power";
   string UIWidget = "Slider";
   string UIHelp = "�������x";
   bool UIVisible =  true;
   float UIMin = 0;
   float UIMax = 20;
> = 1.0;

// �X�P�[���l�擾
float scaling0 : CONTROLOBJECT < string name = "(self)"; >;
static float scaling = scaling0 * 0.1 * (1.0 + pos_z / 100) * Power2;

// X��]
float3 rot : CONTROLOBJECT < string name = "(self)"; string item = "Rxyz"; >;

//��䊂̐�

#ifndef MIKUMIKUMOVING

float Glare : CONTROLOBJECT < string name = "(self)"; string item = "X"; >;

#else

int Glare <
   string UIName = "Glare";
   string UIWidget = "Slider";
   string UIHelp = "��䊂̐����w�肵�܂��B";
   bool UIVisible =  true;
   int UIMin = 0;
   int UIMax = 6;
> = 0;

#endif

//��䊂̒���
static float GlareAspect = (rot.y * 180 / PI + 100) / 100;


#if SCREEN_TONECURVE==0
    bool ScreenToneCurve : CONTROLOBJECT < string name = "ToneCurve.x"; >;
#else
    bool ScreenToneCurve = true;
#endif

//����
float ftime : TIME <bool SyncInEditMode = SYNC;>;

static float timerate = (rot.z > 0) ? ((1 + cos(ftime * 2 * PI / (rot.z / PI * 180))) * 0.4 + 0.2)
                     : ((rot.z < 0) ? (frac(ftime / (-rot.z / PI * 180)) < 0.5) : 1.0);

// �X�N���[���T�C�Y
float2 ViewportSize : VIEWPORTPIXELSIZE;
static float Aspect = ViewportSize.x / ViewportSize.y;
static float2 ViewportOffset = (float2(0.5,0.5)/ViewportSize);
static float2 OnePx = (float2(1,1)/ViewportSize);

static float2 SampStep = (float2(Extent,Extent)/ViewportSize*ViewportSize.y);
static float2 SampStepScaled = SampStep * alpha1 / SAMP_NUM * 8.0;

static float SampStep2 = Extent * alpha1 / SAMP_NUM2 * GlareAspect * 100;


bool TestMode : CONTROLOBJECT < string name = "AL_Test.x"; >;



////////////////////////////////////////////////////////////////////////////////////
// �[�x�o�b�t�@
texture2D DepthBuffer : RENDERDEPTHSTENCILTARGET <
    float2 ViewPortRatio = {TEXSIZE1,TEXSIZE1};
    string Format = "D24S8";
>;
texture2D DepthBuffer2 : RENDERDEPTHSTENCILTARGET <
    float2 ViewPortRatio = {TEXSIZE2,TEXSIZE2};
    string Format = "D24S8";
>;
texture2D DepthBuffer3 : RENDERDEPTHSTENCILTARGET <
    float2 ViewPortRatio = {TEXSIZE3,TEXSIZE3};
    string Format = "D24S8";
>;
texture2D DepthBuffer4 : RENDERDEPTHSTENCILTARGET <
    float2 ViewPortRatio = {TEXSIZE4,TEXSIZE4};
    string Format = "D24S8";
>;


///////////////////////////////////////////////////////////////////////////////////////////////

// �I���W�i���̕`�挋�ʂ��L�^���邽�߂̃����_�[�^�[�Q�b�g
texture2D ScnMap : RENDERCOLORTARGET <
    float2 ViewPortRatio = {1.0,1.0};
    int MipLevels = 1;
    #if HDR_RENDER==0
        string Format = "A8R8G8B8" ;
    #else
        string Format = AL_TEXFORMAT ;
    #endif
>;
sampler2D ScnSamp = sampler_state {
    texture = <ScnMap>;
    MinFilter = Linear;
    MagFilter = Linear;
    MipFilter = None;
    AddressU  = CLAMP;
    AddressV = CLAMP;
};

// ���P�x�������L�^���邽�߂̃����_�[�^�[�Q�b�g
texture2D HighLight : RENDERCOLORTARGET <
    float2 ViewPortRatio = {TEXSIZE1,TEXSIZE1};
    int MipLevels = 0;
    string Format = AL_TEXFORMAT ;
    
>;
sampler2D HighLightView = sampler_state {
    texture = <HighLight>;
    MinFilter = Linear;
    MagFilter = Linear;
    MipFilter = Point;
    AddressU  = Border;
    AddressV = Border;
};

// X�����̂ڂ������ʂ��L�^���邽�߂̃����_�[�^�[�Q�b�g
texture2D ScnMapX : RENDERCOLORTARGET <
    float2 ViewPortRatio = {TEXSIZE1,TEXSIZE1};
    int MipLevels = 1;
    string Format = AL_TEXFORMAT ;
>;
sampler2D ScnSampX = sampler_state {
    texture = <ScnMapX>;
    MinFilter = Linear;
    MagFilter = Linear;
    MipFilter = Point;
    AddressU  = Clamp;
    AddressV = Clamp;
};

// �o�͌��ʂ��L�^���邽�߂̃����_�[�^�[�Q�b�g
texture2D ScnMapOut : RENDERCOLORTARGET <
    float2 ViewPortRatio = {TEXSIZE1,TEXSIZE1};
    int MipLevels = 1;
    string Format = AL_TEXFORMAT ;
>;
sampler2D ScnSampOut = sampler_state {
    texture = <ScnMapOut>;
    MinFilter = Linear;
    MagFilter = Linear;
    MipFilter = Point;
    AddressU  = Clamp;
    AddressV = Clamp;
};

// X�����̂ڂ������ʂ��L�^���邽�߂̃����_�[�^�[�Q�b�g
texture2D ScnMapX2 : RENDERCOLORTARGET <
    float2 ViewPortRatio = {TEXSIZE2,TEXSIZE2};
    int MipLevels = 1;
    string Format = AL_TEXFORMAT ;
>;
sampler2D ScnSampX2 = sampler_state {
    texture = <ScnMapX2>;
    MinFilter = Linear;
    MagFilter = Linear;
    MipFilter = Point;
    AddressU  = Clamp;
    AddressV = Clamp;
};

// �o�͌��ʂ��L�^���邽�߂̃����_�[�^�[�Q�b�g
texture2D ScnMapOut2 : RENDERCOLORTARGET <
    float2 ViewPortRatio = {TEXSIZE2,TEXSIZE2};
    int MipLevels = 1;
    string Format = AL_TEXFORMAT ;
>;
sampler2D ScnSampOut2 = sampler_state {
    texture = <ScnMapOut2>;
    MinFilter = Linear;
    MagFilter = Linear;
    MipFilter = Point;
    AddressU  = Clamp;
    AddressV = Clamp;
};

// X�����̂ڂ������ʂ��L�^���邽�߂̃����_�[�^�[�Q�b�g
texture2D ScnMapX3 : RENDERCOLORTARGET <
    float2 ViewPortRatio = {TEXSIZE3,TEXSIZE3};
    int MipLevels = 1;
    string Format = AL_TEXFORMAT ;
>;
sampler2D ScnSampX3 = sampler_state {
    texture = <ScnMapX3>;
    MinFilter = Linear;
    MagFilter = Linear;
    MipFilter = Point;
    AddressU  = Clamp;
    AddressV = Clamp;
};

// �o�͌��ʂ��L�^���邽�߂̃����_�[�^�[�Q�b�g
texture2D ScnMapOut3 : RENDERCOLORTARGET <
    float2 ViewPortRatio = {TEXSIZE3,TEXSIZE3};
    int MipLevels = 1;
    string Format = AL_TEXFORMAT ;
>;
sampler2D ScnSampOut3 = sampler_state {
    texture = <ScnMapOut3>;
    MinFilter = Linear;
    MagFilter = Linear;
    MipFilter = Point;
    AddressU  = Clamp;
    AddressV = Clamp;
};

// X�����̂ڂ������ʂ��L�^���邽�߂̃����_�[�^�[�Q�b�g
texture2D ScnMapX4 : RENDERCOLORTARGET <
    float2 ViewPortRatio = {TEXSIZE4,TEXSIZE4};
    int MipLevels = 1;
    string Format = AL_TEXFORMAT ;
>;
sampler2D ScnSampX4 = sampler_state {
    texture = <ScnMapX4>;
    MinFilter = Linear;
    MagFilter = Linear;
    MipFilter = Point;
    AddressU  = Clamp;
    AddressV = Clamp;
};

// �o�͌��ʂ��L�^���邽�߂̃����_�[�^�[�Q�b�g
texture2D ScnMapOut4 : RENDERCOLORTARGET <
    float2 ViewPortRatio = {TEXSIZE4,TEXSIZE4};
    int MipLevels = 1;
    string Format = AL_TEXFORMAT ;
>;
sampler2D ScnSampOut4 = sampler_state {
    texture = <ScnMapOut4>;
    MinFilter = Linear;
    MagFilter = Linear;
    MipFilter = Point;
    AddressU  = Clamp;
    AddressV = Clamp;
};

// �O���A���L�^���邽�߂̃����_�[�^�[�Q�b�g
texture2D ScnMapGlare : RENDERCOLORTARGET <
    float2 ViewPortRatio = {TEXSIZE2,TEXSIZE2};
    int MipLevels = 1;
    string Format = AL_TEXFORMAT ;
>;
sampler2D ScnSampGlare = sampler_state {
    texture = <ScnMapGlare>;
    MinFilter = Linear;
    MagFilter = Linear;
    MipFilter = Point;
    AddressU  = Clamp;
    AddressV = Clamp;
};


#if AFTERGLOW!=0
    
    // �c�����L�^���邽�߂̃����_�[�^�[�Q�b�g
    texture2D AfterGlowMap : RENDERCOLORTARGET <
        float2 ViewPortRatio = {TEXSIZE2,TEXSIZE2};
        int MipLevels = 1;
        string Format = AL_TEXFORMAT ;
    >;
    sampler2D AfterGlowSamp = sampler_state {
        texture = <AfterGlowMap>;
        MinFilter = Linear;
        MagFilter = Linear;
        MipFilter = Point;
        AddressU  = Clamp;
        AddressV = Clamp;
    };
    
#endif

////////////////////////////////////////////////////////////////////////////////////////////////
// ���Ƃѕ\���֐�
float4 OverExposure(float4 color){
    float4 newcolor = color;
    
    //����F��1�𒴂���ƁA���̐F�ɂ��ӂ��
    newcolor.gb += max(color.r - 1, 0) * 0.5 * OverExposureRatio;
    newcolor.rb += max(color.g - 1, 0) * 0.6 * OverExposureRatio;
    newcolor.rg += max(color.b - 1, 0) * 0.4 * OverExposureRatio;
    
    return newcolor;
}


////////////////////////////////////////////////////////////////////////////////////////////////
//�L�[�J���[��r

float ColorMuch(float4 color1, float3 key){
    float3 s = color1.rgb - key;
    float val = length(s) / KeyThreshold;
    val = saturate((1 - val) * 4);
    return val;
}

////////////////////////////////////////////////////////////////////////////////////////////////
//�g�[���J�[�u�̒���
//�����ł������ǂ��Ȃ��Ă��邩�悭�킩��Ȃ��֐��ɂȂ��Ă��܂������A
//���ƂȂ����܂������Ă���̂ŕ|���Ă�����Ȃ�

float4 ToneCurve(float4 Color){
    float3 newcolor;
    const float th = 0.65;
    newcolor = normalize(Color.rgb) * (th + sqrt(max(0, (length(Color.rgb) - th) / 2)));
    newcolor.r = (Color.r > 0) ? newcolor.r : Color.r;
    newcolor.g = (Color.g > 0) ? newcolor.g : Color.g;
    newcolor.b = (Color.b > 0) ? newcolor.b : Color.b;
    
    Color.rgb = min(Color.rgb, newcolor);
    
    return Color;
}

////////////////////////////////////////////////////////////////////////////////////////////////
//���ʒ��_�V�F�[�_
struct VS_OUTPUT {
    float4 Pos            : POSITION;
    float2 Tex            : TEXCOORD0;
};

VS_OUTPUT VS_Draw( float4 Pos : POSITION, float2 Tex : TEXCOORD0 , uniform int miplevel) {
    VS_OUTPUT Out = (VS_OUTPUT)0; 
    
    
    #ifdef MIKUMIKUMOVING
    float ofsetsize = 1;
    #else
    float ofsetsize = pow(2, miplevel);
    #endif
    
    
    Out.Pos = Pos;
    Out.Tex = Tex + float2(ViewportOffset.x, ViewportOffset.y) * ofsetsize;
    
    return Out;
}


////////////////////////////////////////////////////////////////////////////////////////////////

struct DoubleColor{
    float4 Color0  : COLOR0;
    float4 Color1  : COLOR1;
};

DoubleColor PS_DrawHighLight( float2 Tex: TEXCOORD0 ) {
    DoubleColor Out = (DoubleColor)0;
    float4 Color, OrgColor, OverLightColor;
    
    Color = tex2Dlod(EmitterView, float4(Tex, 0, 0));
    //Color.a = 0;
    
    //���X�N���[���̍��P�x�����̒��o
    OrgColor = tex2Dlod(ScnSamp, float4(Tex, 0, 0));
    OverLightColor = OrgColor * OverLight;
    OverLightColor = OverExposure(OverLightColor);
    OverLightColor = max(0, OverLightColor - 1.0);
    OverLightColor = ToneCurve(OverLightColor);
    OverLightColor *= 0.8;
    
    #if KEYCOLOR_NUM!=0
        [unroll] //���[�v�W�J
        for(int i = 0; i < KEYCOLOR_NUM; i++){
            float cm = ColorMuch(OrgColor, KeyColors[i][0]);
            Color.rgb += cm * KeyColors[i][2];
            Out.Color1 = lerp(Out.Color1, float4(KeyColors[i][1], 1), cm);
        }
    #endif
    
    Color *= scaling * timerate * 1.8;
    Color.rgb += OverLightColor.rgb * scaling;
    
    Out.Color0 = Color;
    
    return Out;
}

////////////////////////////////////////////////////////////////////////////////////////////////

#define HLSampler HighLightView

////////////////////////////////////////////////////////////////////////////////////////////////
// MipMap���p�ڂ���

float4 PS_GaussianMipMap( float2 Tex: TEXCOORD0, 
           uniform bool Horizontal, uniform sampler2D Samp, 
           uniform int miplevel, uniform int scalelevel
           ) : COLOR {
    
    float e, n = 0;
    float2 stex;
    float4 Color, sum = 0;
    float scalepow = pow(2, scalelevel);
    float step = (Horizontal ? SampStepScaled.x : SampStepScaled.y) * scalepow;
    float4 scolor;
    
    [unroll] //���[�v�W�J
    for(int i = -SAMP_NUM; i <= SAMP_NUM; i++){
        e = exp(-pow((float)i / (SAMP_NUM / 2.0), 2) / 2); //���K���z
        stex = Tex + float2(Horizontal, !Horizontal) * (step * (float)i);
        scolor = tex2Dlod( Samp, float4(stex, 0, miplevel));
        sum += scolor * e;
        n += e;
    }
    
    Color = sum / n;
    //Color = max(0, Color - scalepow * 0.0007); //��P�x�̈�̌��̍L����𐧌�
    
     //��P�x�̈�̌��̍L����𐧌�
    const float UnderLimit = 0.0007;
    if(Color.r > 0) Color.r = max(0, Color.r - scalepow * 0.0007);
    else            Color.r = min(0, Color.r + scalepow * 0.0007);
    if(Color.g > 0) Color.g = max(0, Color.g - scalepow * 0.0007);
    else            Color.g = min(0, Color.g + scalepow * 0.0007);
    if(Color.b > 0) Color.b = max(0, Color.b - scalepow * 0.0007);
    else            Color.b = min(0, Color.b + scalepow * 0.0007);
    
    return Color;
}


////////////////////////////////////////////////////////////////////////////////////////////////

float4 PS_DirectionalBlur( float2 Tex: TEXCOORD0 ) : COLOR {   
    float e, n = 0;
    float2 stex1, stex2, stex3, stex4;
    float4 Color, sum = 0;
    float4 sum1 = 0, sum2 = 0, sum3 = 0;
    
    float step = SampStep2 * (1.0 + cos(LoopIndex * 5.1 + rot.x * 10) * 0.3);
    float4 scolor;
    
    float ang = (LoopIndex * 180.0 / (int)Glare) * PI / 180 + rot.x;
    float2 dir = float2(cos(ang) / Aspect, sin(ang)) * step;
    float p = 1;
    
    #if GLARE_LONGONE!=0
        p = (1 + (LoopIndex == 0)) * 0.7;
        dir *= p;
    #endif
    
    [unroll] //���[�v�W�J
    for(int i = -SAMP_NUM2; i <= SAMP_NUM2; i++){
        e = exp(-pow((float)i / (SAMP_NUM2 / 2.0), 2) / 2); //���K���z
        stex1 = Tex + dir * ((float)i * 1);
        stex2 = Tex + dir * ((float)i * 1.8);
        stex3 = Tex + dir * ((float)i * 3.5);
        sum1 += max(0, tex2Dlod( HLSampler, float4(stex1, 0, 1) )) * e;
        sum2 += max(0, tex2Dlod( HLSampler, float4(stex2, 0, 2) )) * e;
        sum3 += max(0, tex2Dlod( HLSampler, float4(stex3, 0, 3) )) * e;
        sum += scolor * e;
        n += e;
    }
    
    sum1 /= n;
    sum2 /= n;
    sum3 /= n;
    
    sum1 = max(0, sum1 - 0.006); sum2 = max(0, sum2 - 0.015); sum3 = max(0, sum3 - 0.025);
    
    Color = sum1 + sum2 + sum3;
    
    Color = ToneCurve(Color * GlarePower);
    
    Color /= sqrt((float)(int)Glare);
    
    Color *= p;
    
    return Color;
}

////////////////////////////////////////////////////////////////////////////////////////////////

float4 PS_DrawCoreColor( float2 Tex: TEXCOORD0 ) : COLOR {
    float4 Color;
    
    Color = tex2D(ScnSampOut, Tex);
    
    Color = max(Color, 0.8 * tex2D( ScnSampOut, Tex+float2(0,OnePx.y)));
    Color = max(Color, 0.8 * tex2D( ScnSampOut, Tex+float2(0,-OnePx.y)));
    Color = max(Color, 0.8 * tex2D( ScnSampOut, Tex+float2(OnePx.x,0)));
    Color = max(Color, 0.8 * tex2D( ScnSampOut, Tex+float2(-OnePx.x,0)));
    
    Color = max(Color, 0.5 * tex2D( ScnSampOut, Tex+float2(OnePx.x,OnePx.y)));
    Color = max(Color, 0.5 * tex2D( ScnSampOut, Tex+float2(OnePx.x,-OnePx.y)));
    Color = max(Color, 0.5 * tex2D( ScnSampOut, Tex+float2(-OnePx.x,OnePx.y)));
    Color = max(Color, 0.5 * tex2D( ScnSampOut, Tex+float2(-OnePx.x,-OnePx.y)));
    
    return Color;
}

////////////////////////////////////////////////////////////////////////////////////////////////

#if AFTERGLOW!=0
    float4 PS_AfterGlowCopy( float2 Tex: TEXCOORD0 ) : COLOR {
        float4 Color = tex2D(AfterGlowSamp, Tex);
        
        Color += tex2D(AfterGlowSamp, Tex + float2(SampStep.x, 0));
        Color += tex2D(AfterGlowSamp, Tex - float2(SampStep.x, 0));
        Color += tex2D(AfterGlowSamp, Tex + float2(0, SampStep.y));
        Color += tex2D(AfterGlowSamp, Tex - float2(0, SampStep.y));
        Color /= 5;
        
        
        Color *= (1.0 - 1.0 / AFTERGLOW);
        //Color -= 0.1;
        //Color = max(Color, 0);
        
        return Color;
    }
#endif

////////////////////////////////////////////////////////////////////////////////////////////////

float4 PS_Mix( float2 Tex: TEXCOORD0 , uniform bool FullOut) : COLOR {
    
    float4 Color;
    
    float crate1 = 1, crate2 = 1, crate3 = 1;
    
    Color = tex2D(ScnSampOut, Tex);
    Color += tex2D(ScnSampOut2, Tex) * crate1;
    Color += tex2D(ScnSampOut3, Tex) * crate2;
    Color += tex2D(ScnSampOut4, Tex) * crate3;
    
    Color += tex2D(ScnSampGlare, Tex);
    
    if(!ScreenToneCurve) Color = ToneCurve(Color); //�g�[���J�[�u�̒���
    
    //�}�X�N�̓K�p
    #if MASK_ENABLE!=0
        Color *= 1 - tex2D(MaskView, Tex).a;
    #endif
    
    #if AFTERGLOW!=0
        Color = max(Color, tex2D(ScnSampX2, Tex));
    #endif
    
    if(!FullOut){
        Color.a = saturate(Color.a);
        return Color;
    }
    
    
    float4 basecolor = tex2D(ScnSamp, Tex);
    basecolor.rgb *= OverLight;
    Color = Color + basecolor;
    
    //���Ƃѕ\��
    Color = OverExposure(Color);
    
    if(ScreenToneCurve) Color = ToneCurve(Color); //�g�[���J�[�u�̒���
    
    Color.a = basecolor.a + length(Color.rgb);
    Color.a = saturate(Color.a);
    Color.rgb /= Color.a;
    
    return Color;
}

////////////////////////////////////////////////////////////////////////////////////////////////

float4 PS_Test( float2 Tex: TEXCOORD0 ) : COLOR {
    return float4(tex2D(HighLightView, Tex).rgb, 1);
    //return float4(tex2D(EmitterView, Tex).rgb, 1);
    
}

////////////////////////////////////////////////////////////////////////////////////////////////
//�e�N�j�b�N

// �����_�����O�^�[�Q�b�g�̃N���A�l

float4 ClearColor = {0,0,0,0};
float ClearDepth  = 1.0;


technique ObjectLuminous <
    string Script = 
        "RenderColorTarget0=ScnMap;"
        "RenderDepthStencilTarget=DepthBuffer;"
        "ClearSetColor=BackColor; ClearSetDepth=ClearDepth;"
        "Clear=Color; Clear=Depth;"
        "ScriptExternal=Color;"
        
        "RenderColorTarget0=HighLight;"
        "RenderColorTarget1=ScnMapOut;"
        "ClearSetColor=ClearColor; ClearSetDepth=ClearDepth;"
        "Clear=Color; Clear=Depth;"
        "Pass=DrawHighLight;"
        
        #if KEYCOLOR_NUM!=0
            "RenderColorTarget0=ScnMap;"
            "RenderColorTarget1=;"
            "RenderDepthStencilTarget=DepthBuffer;"
            "Pass=DrawCoreColor;"
        #endif
        
        "RenderColorTarget0=ScnMapX;"
        "RenderColorTarget1=;"
        "RenderDepthStencilTarget=DepthBuffer;"
        "ClearSetColor=ClearColor; ClearSetDepth=ClearDepth;"
        "Clear=Color; Clear=Depth;"
        "Pass=Gaussian_X;"
        
        "RenderColorTarget0=ScnMapOut;"
        "Clear=Color; Clear=Depth;"
        "Pass=Gaussian_Y;"
        
        "RenderColorTarget0=ScnMapX2;"
        "RenderDepthStencilTarget=DepthBuffer2;"
        "Clear=Color; Clear=Depth;"
        "Pass=Gaussian_X2;"
        
        "RenderColorTarget0=ScnMapOut2;"
        "Clear=Color; Clear=Depth;"
        "Pass=Gaussian_Y2;"
        
        "RenderColorTarget0=ScnMapX3;"
        "RenderDepthStencilTarget=DepthBuffer3;"
        "Clear=Color; Clear=Depth;"
        "Pass=Gaussian_X3;"
        
        "RenderColorTarget0=ScnMapOut3;"
        "Clear=Color; Clear=Depth;"
        "Pass=Gaussian_Y3;"
        
        "RenderColorTarget0=ScnMapX4;"
        "RenderDepthStencilTarget=DepthBuffer4;"
        "Clear=Color; Clear=Depth;"
        "Pass=Gaussian_X4;"
        
        "RenderColorTarget0=ScnMapOut4;"
        "Clear=Color; Clear=Depth;"
        "Pass=Gaussian_Y4;"
        
        "RenderColorTarget0=ScnMapGlare;"
        "RenderDepthStencilTarget=DepthBuffer2;"
        "Clear=Color; Clear=Depth;"
        
        "LoopByCount=Glare;"
        "LoopGetIndex=LoopIndex;"
            
            "Pass=DirectionalBlur;"
            
        "LoopEnd=;"
        
        
        #if AFTERGLOW!=0
            "RenderColorTarget0=ScnMapX2;"
            "RenderDepthStencilTarget=DepthBuffer2;"
            "ClearSetColor=ClearColor; ClearSetDepth=ClearDepth;"
            "Clear=Color; Clear=Depth;"
            "Pass=AfterGlowCopy;"
            
            "RenderColorTarget0=AfterGlowMap;"
            "RenderDepthStencilTarget=DepthBuffer2;"
            "ClearSetDepth=ClearDepth;"
            "Clear=Depth;"
            "Pass=AfterGlow;"
        #endif
        
        "RenderColorTarget0=;"
        "RenderDepthStencilTarget=;"
        "ClearSetColor=ClearColor; ClearSetDepth=ClearDepth;"
        "Clear=Depth;"
        "Clear=Color;"
        "Pass=Mix;"
        
        "LoopByCount=TestMode;"
        "LoopGetIndex=LoopIndex;"
            
            "Pass=Test;"
            
        "LoopEnd=;"
    ;
    
> {
    
    pass Gaussian_X < string Script= "Draw=Buffer;"; > {
        AlphaBlendEnable = false;
        AlphaTestEnable = false;
        VertexShader = compile vs_3_0 VS_Draw(0);
        PixelShader  = compile ps_3_0 PS_GaussianMipMap(true, HLSampler, 0, 0);
    }
    pass Gaussian_Y < string Script= "Draw=Buffer;"; > {
        AlphaBlendEnable = false;
        AlphaTestEnable = false;
        VertexShader = compile vs_3_0 VS_Draw(0);
        PixelShader  = compile ps_3_0 PS_GaussianMipMap(false, ScnSampX, 0, 0);
    }
    
    pass Gaussian_X2 < string Script= "Draw=Buffer;"; > {
        AlphaBlendEnable = false;
        AlphaTestEnable = false;
        VertexShader = compile vs_3_0 VS_Draw(1);
        PixelShader  = compile ps_3_0 PS_GaussianMipMap(true, HLSampler, 2, 2);
    }
    pass Gaussian_Y2 < string Script= "Draw=Buffer;"; > {
        AlphaBlendEnable = false;
        AlphaTestEnable = false;
        VertexShader = compile vs_3_0 VS_Draw(1);
        PixelShader  = compile ps_3_0 PS_GaussianMipMap(false, ScnSampX2, 0, 2);
    }
    
    pass Gaussian_X3 < string Script= "Draw=Buffer;"; > {
        AlphaBlendEnable = false;
        AlphaTestEnable = false;
        VertexShader = compile vs_3_0 VS_Draw(2);
        PixelShader  = compile ps_3_0 PS_GaussianMipMap(true, HLSampler, 4, 4);
    }
    pass Gaussian_Y3 < string Script= "Draw=Buffer;"; > {
        AlphaBlendEnable = false;
        AlphaTestEnable = false;
        VertexShader = compile vs_3_0 VS_Draw(2);
        PixelShader  = compile ps_3_0 PS_GaussianMipMap(false, ScnSampX3, 0, 4);
    }
    
    pass Gaussian_X4 < string Script= "Draw=Buffer;"; > {
        AlphaBlendEnable = false;
        AlphaTestEnable = false;
        VertexShader = compile vs_3_0 VS_Draw(3);
        PixelShader  = compile ps_3_0 PS_GaussianMipMap(true, HLSampler, 5, 5);
    }
    pass Gaussian_Y4 < string Script= "Draw=Buffer;"; > {
        AlphaBlendEnable = false;
        AlphaTestEnable = false;
        VertexShader = compile vs_3_0 VS_Draw(3);
        PixelShader  = compile ps_3_0 PS_GaussianMipMap(false, ScnSampX4, 0, 5);
    }
    
    
    
    pass DirectionalBlur < string Script= "Draw=Buffer;"; > {
        SRCBLEND = ONE;
        DESTBLEND = ONE;
        AlphaTestEnable = false;
        VertexShader = compile vs_3_0 VS_Draw(1);
        PixelShader  = compile ps_3_0 PS_DirectionalBlur();
    }
    
    
    
    pass DrawHighLight < string Script= "Draw=Buffer;"; > {
        AlphaTestEnable = false;
        AlphaBlendEnable = false;
        VertexShader = compile vs_3_0 VS_Draw(0);
        PixelShader  = compile ps_3_0 PS_DrawHighLight();
    }
    
    pass DrawCoreColor < string Script= "Draw=Buffer;"; > {
        AlphaTestEnable = true;
        AlphaBlendEnable = true;
        VertexShader = compile vs_3_0 VS_Draw(0);
        PixelShader  = compile ps_3_0 PS_DrawCoreColor();
    }
    
    #if AFTERGLOW!=0
        pass AfterGlowCopy < string Script= "Draw=Buffer;"; > {
            AlphaTestEnable = false;
            VertexShader = compile vs_3_0 VS_Draw(1);
            PixelShader  = compile ps_3_0 PS_AfterGlowCopy();
        }
        
        pass AfterGlow < string Script= "Draw=Buffer;"; > {
            
            #if ALPHA_OUT!=0
                AlphaBlendEnable = false;
                AlphaTestEnable = false;
            #endif
            
            VertexShader = compile vs_3_0 VS_Draw(1);
            PixelShader  = compile ps_3_0 PS_Mix(false);
        }
    
    #endif
    
    pass Mix < string Script= "Draw=Buffer;"; > {
        
        #if ALPHA_OUT!=0
            AlphaBlendEnable = false;
            AlphaTestEnable = false;
        #endif
        
        VertexShader = compile vs_3_0 VS_Draw(0);
        PixelShader  = compile ps_3_0 PS_Mix(true);
    }
    
    pass Test < string Script= "Draw=Buffer;"; > {
        AlphaBlendEnable = false;
        AlphaTestEnable = false;
        VertexShader = compile vs_3_0 VS_Draw(0);
        PixelShader  = compile ps_3_0 PS_Test();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////




