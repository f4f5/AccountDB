const router = require('koa-router')();

///////////////////////////////////////////////////

router.get('/', async (ctx, next) => {
    ctx.body = 'hello'
});

router.get('/pricehistory', async (ctx, next) => {
    await ctx.render('pricehistory', {
        title: 'UNION',
        content:'sssssssssssssssss'
    });
});

module.exports = router;


/*

@routes.get('/mywallet')
@aiohttp_jinja2.template('mywallet.html')
async def handler1(request):
    return {'name': 'Andrew', 'surname': 'Svetlov'}

@routes.get('/pricehistory')
@aiohttp_jinja2.template('pricehistory.html')
async def handler_ph(request):
    return

@routes.get('/detail')
@aiohttp_jinja2.template('detail.html')
async def handler2(request):
    return {'name': 'Andrew', 'surname': 'Svetlov'}


@routes.get('/signup')
@aiohttp_jinja2.template('signup.html')
async def handler3(request):
    return {'name': 'Andrew', 'surname': 'Svetlov'}


@routes.get('/netnode')
@aiohttp_jinja2.template('netnode.html')
async def handler4(request):
    return {'name': 'Andrew', 'surname': 'Svetlov'}

@routes.get('/introduce')
@aiohttp_jinja2.template('intro.html')
async def handler5(request):
    session = await get_session(request)
    last = session['last'] if 'last' in session else None
    print(last,'  ssssss', session)
    session['last'] = 5555555
    return {'name': 'Andrew', 'surname': 'Svetlov'}

@routes.get('/')
@aiohttp_jinja2.template('navigate.html')
async def handler6(request):
    servers=[
        {
            'url':'http://localhost:8080',
            'img':'/s/img/test.png',
            'des':'hello world'
        }
    ]*9
    return {'servers': servers, 'surname': 'Svetlov'}

@routes.get('/pricehistory')
@aiohttp_jinja2.template('pricehistory.html')
async def render_history_data(request):
   return

@routes.post('/signup_emailcheck')
async def check_email(request):
    return web.Response(text=await sign.checkEmail(request))

@routes.post('/signup_signup')
async def signup(request):    
    return web.Response(text=await sign.signup(request))

@routes.post('/signup_login')
async def login(request):
    return web.Response(text=await sign.login(request))

@routes.post('/mywallet_trade_data')
async def fetch_trade_data(request):
    data = [[1,2,3,4,5]]*10
    return web.json_response(data)

@routes.get('/tem_for_pricehistory')
async def fetch_price_history(request):
    """
        0: "2011-01-01↵00:01:00"
        1: 3765.34   O
        2: 3765.34   H
        3: 3761.34   L
        4: 3763.21   C
        5: "3841987" V
        6: -1        Sign
    """
    start = datetime.timestamp(datetime.now()) - 10*365*24*3600
    def parsetime(n):
        now = start + n * 3600        
        return datetime.strftime(datetime.fromtimestamp(now), "%Y-%m-%d\n%H:%M:%S")
    
    sdata = [3765.34, 3769.34, 3760.31, 3767.23, '283823', 1]    
    ldata = sdata.copy()
    def parsedata():
        ran = random.random()
        if ran>0.5:
            sign=1
        else:
            sign=-1
        scale = 100*(ran-0.5)
        
        if sign>0:
            ldata[0] = ldata[3] + ran*10  #open
            ldata[3] +=scale  #close
            ldata[2] = ldata[0] - random.random()*40 #low
            ldata[1] = ldata[3] + random.random()*40 #high
            ldata[4] = str(int(100000*random.random()))
            ldata[5] = sign
        else:
            ldata[0] = ldata[3] - ran*10 #open
            ldata[3] +=scale                #close
            ldata[2] = ldata[3] - random.random()*40 #low
            ldata[1] = ldata[0] + random.random()*50  #high
            ldata[4] = str(int(10000*random.random()))
            ldata[5] = sign
        return ldata.copy()
          
    data = [[parsetime(i), *parsedata()] for i in range(10000)]
    return web.json_response(data)

@routes.post('/send_info_to')
async def handle_info(request):
    data = await request.post()
    """
    data description:
    * fabric client result:
        signup login query transfer etc.
    * connetcor result:
        server list search result
    * same type server message exchange    
    """
    return web.Response(text='1')

async def start_background_tasks(app):
    app['kickout'] = app['loop'].create_task(sign.kickout(app))

# async def cleanup_background_tasks(app):
#     print('into clean up')
#     app['kickout'].cancel()
#     await app['kickout']

@web.middleware
async def server_redirect(request, handler):    
    cookies = request.cookies
    # print('server redirect s', ' the cookie is: ',cookies)    
    location = cookies.get('redirect')
    if location:
        raise web.HTTPFound('https://github.com')
    else:
        response = await handler(request)
        # print('server redirect e')
        return response

async def init(app):
    """
    request connector to fetch info
    """
    with open('./config.json','r') as f:
        appinfo = json.load(f)
    for k in appinfo:
        app[k] = appinfo[k] 

    #initialize redis
    # app['redis'] = await aioredis.create_redis_pool(
    #     'redis://localhost',
    #     minsize=5, maxsize=10,
    #     loop=app['loop'])
    
    #requst connector for  
    # path = '/get_server/'
    # for item in appinfo['require_type']:
    #     path += item+'&'       
    # ans = await utils.sureAnswer(appinfo['connectors'], path.strip('&'))
    # for item in appinfo['require_type']:
    #     app[item] = ans[item]  
*/