var newsController = function () {

    var request = require('request');

    var getNews = function (req, res) {

        req.checkQuery('source', 'Source is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.status(400);
            res.send({data: null, error: { statusCode:400, errorMessage: errors}});
            return;
        }

        var source = req.query.source;
        request('https://newsapi.org/v1/articles?source=' + source + '&apiKey=1bd3b8ed8d7f47569b88d929a21941dc', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.status(200);
                res.send({data: JSON.parse(body), error: null});
            } else {
                res.status(400);
                res.send({data: null, error: { statusCode:400, errorMessage: error}});
            }
        });
    };

    var getSources = function (req, res) {
        var data = [
            {
                "id": "abc-news-au",
                "description": "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
                "category": "general"
            },
            {
                "id": "ars-technica",
                "description": "The PC enthusiast's resource. Power users and the tools they love, without computing religion.",
                "category": "technology"
            },
            {
                "id": "associated-press",
                "description": "The AP delivers in-depth coverage on the international, politics, lifestyle, business, and entertainment news.",
                "category": "general"
            },
            {
                "id": "bbc-news",
                "description": "Use BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. Also entertainment, business, science, technology and health news.",
                "category": "general"
            },
            {
                "id": "bbc-sport",
                "description": "The home of BBC Sport online. Includes live sports coverage, breaking news, results, video, audio and analysis on Football, F1, Cricket, Rugby Union, Rugby League, Golf, Tennis and all the main world sports, plus major events such as the Olympic Games.",
                "category": "sport"
            },
            {
                "id": "bild",
                "description": "Die Seite 1 für aktuelle Nachrichten und Themen, Bilder und Videos aus den Bereichen News, Wirtschaft, Politik, Show, Sport, und Promis.",
                "category": "general"
            },
            {
                "id": "bloomberg",
                "description": "Bloomberg delivers business and markets news, data, analysis, and video to the world, featuring stories from Businessweek and Bloomberg News.",
                "category": "business"
            },
            {
                "id": "business-insider",
                "description": "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
                "category": "business"
            },
            {
                "id": "business-insider-uk",
                "description": "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
                "category": "business"
            },
            {
                "id": "buzzfeed",
                "description": "BuzzFeed is a cross-platform, global network for news and entertainment that generates seven billion views each month.",
                "category": "entertainment"
            },
            {
                "id": "cnbc",
                "description": "Get latest business news on stock markets, financial earnings on CNBC. View world markets streaming charts video; check stock tickers and quotes.",
                "category": "business"
            },
            {
                "id": "cnn",
                "description": "View the latest news and breaking news today for U.S., world, weather, entertainment, politics and health at CNN",
                "category": "general"
            },
            {
                "id": "daily-mail",
                "description": "All the latest news, sport, showbiz, science and health stories from around the world from the Daily Mail and Mail on Sunday newspapers.",
                "category": "entertainment"
            },
            {
                "id": "der-tagesspiegel",
                "description": "Nachrichten, News und neueste Meldungen aus dem Inland und dem Ausland - aktuell präsentiert von tagesspiegel.de.",
                "category": "general"
            },
            {
                "id": "die-zeit",
                "description": "Aktuelle Nachrichten, Kommentare, Analysen und Hintergrundberichte aus Politik, Wirtschaft, Gesellschaft, Wissen, Kultur und Sport lesen Sie auf ZEIT ONLINE.",
                "category": "business"
            },
            {
                "id": "engadget",
                "description": "Engadget is a web magazine with obsessive daily coverage of everything new in gadgets and consumer electronics.",
                "category": "technology"
            },
            {
                "id": "entertainment-weekly",
                "description": "Online version of the print magazine includes entertainment news, interviews, reviews of music, film, TV and books, and a special area for magazine subscribers.",
                "category": "entertainment"
            },
            {
                "id": "espn",
                "description": "ESPN has up-to-the-minute sports news coverage, scores, highlights and commentary for NFL, MLB, NBA, College Football, NCAA Basketball and more.",
                "category": "sport"
            },
            {
                "id": "espn-cric-info",
                "description": "ESPN Cricinfo provides the most comprehensive cricket coverage available including live ball-by-ball commentary, news, unparalleled statistics, quality editorial comment and analysis.",
                "category": "sport"
            },
            {
                "id": "financial-times",
                "description": "The latest UK and international business, finance, economic and political news, comment and analysis from the Financial Times on FT.com.",
                "category": "business"
            },
            {
                "id": "focus",
                "description": "Minutenaktuelle Nachrichten und Service-Informationen von Deutschlands modernem Nachrichtenmagazin.",
                "category": "general"
            },
            {
                "id": "football-italia",
                "description": "Italian football news, analysis, fixtures and results for the latest from Serie A, Serie B and the Azzurri.",
                "category": "sport"
            },
            {
                "id": "fortune",
                "description": "Fortune 500 Daily and Breaking Business News",
                "category": "business"
            },
            {
                "id": "four-four-two",
                "description": "The latest football news, in-depth features, tactical and statistical analysis from FourFourTwo, the UK's favourite football monthly.",
                "category": "sport"
            },
            {
                "id": "fox-sports",
                "description": "Find live scores, player and team news, videos, rumors, stats, standings, schedules and fantasy games on FOX Sports.",
                "category": "sport"
            },
            {
                "id": "google-news",
                "description": "Comprehensive, up-to-date news coverage, aggregated from sources all over the world by Google News.",
                "category": "general"
            },
            {
                "id": "gruenderszene",
                "description": "Online-Magazin für Startups und die digitale Wirtschaft. News und Hintergründe zu Investment, VC und Gründungen.",
                "category": "technology"
            },
            {
                "id": "hacker-news",
                "description": "Hacker News is a social news website focusing on computer science and entrepreneurship. It is run by Paul Graham's investment fund and startup incubator, Y Combinator. In general, content that can be submitted is defined as \"anything that gratifies one\u0027s intellectual curiosity\".",
                "category": "technology"
            },
            {
                "id": "handelsblatt",
                "description": "Auf Handelsblatt lesen sie Nachrichten über Unternehmen, Finanzen, Politik und Technik. Verwalten Sie Ihre Finanzanlagen mit Hilfe unserer Börsenkurse.",
                "category": "business"
            },
            {
                "id": "ign",
                "description": "IGN is your site for Xbox One, PS4, PC, Wii-U, Xbox 360, PS3, Wii, 3DS, PS Vita and iPhone games with expert reviews, news, previews, trailers, cheat codes, wiki guides and walkthroughs.",
                "category": "gaming"
            },
            {
                "id": "independent",
                "description": "National morning quality (tabloid) includes free online access to news and supplements. Insight by Robert Fisk and various other columnists.",
                "category": "general"
            },
            {
                "id": "mashable",
                "description": "Mashable is a global, multi-platform media and entertainment company.",
                "category": "entertainment"
            },
            {
                "id": "metro",
                "description": "News, Sport, Showbiz, Celebrities from Metro - a free British newspaper.",
                "category": "general"
            },
            {
                "id": "mirror",
                "description": "All the latest news, sport and celebrity gossip at Mirror.co.uk. Get all the big headlines, pictures, analysis, opinion and video on the stories that matter to you.",
                "category": "general"
            },
            {
                "id": "mtv-news",
                "description": "The ultimate news source for music, celebrity, entertainment, movies, and current events on the web. It's pop culture on steroids.",
                "category": "music"
            },
            {
                "id": "mtv-news-uk",
                "description": "All the latest celebrity news, gossip, exclusive interviews and pictures from the world of music and entertainment.",
                "category": "music"
            },
            {
                "id": "national-geographic",
                "description": "Reporting our world daily: original nature and science news from National Geographic.",
                "category": "science-and-nature"
            },
            {
                "id": "new-scientist",
                "description": "Breaking science and technology news from around the world. Exclusive stories and expert analysis on space, technology, health, physics, life and Earth.",
                "category": "science-and-nature"
            },
            {
                "id": "newsweek",
                "description": "Newsweek provides in-depth analysis, news and opinion about international issues, technology, business, culture and politics.",
                "category": "general"
            },
            {
                "id": "new-york-magazine",
                "description": "NYMAG and New York magazine cover the new, the undiscovered, the next in politics, culture, food, fashion, and behavior nationally, through a New York lens.",
                "category": "general"
            },
            {
                "id": "nfl-news",
                "description": "The official source for NFL news, schedules, stats, scores and more.",
                "category": "sport"
            },
            {
                "id": "polygon",
                "description": "Polygon is a gaming website in partnership with Vox Media. Our culture focused site covers games, their creators, the fans, trending stories and entertainment news.",
                "category": "gaming"
            },
            {
                "id": "recode",
                "description": "Get the latest independent tech news, reviews and analysis from Recode with the most informed and respected journalists in technology and media.",
                "category": "technology"
            },
            {
                "id": "reddit-r-all",
                "description": "Reddit is an entertainment, social news networking service, and news website. Reddit's registered community members can submit content, such as text posts or direct links.",
                "category": "general"
            },
            {
                "id": "reuters",
                "description": "Reuters.com brings you the latest news from around the world, covering breaking news in business, politics, entertainment, technology, video and pictures.",
                "category": "general"
            },
            {
                "id": "sky-news",
                "description": "Sky news delivers breaking news, headlines and top stories from business, politics, entertainment and more in the UK and worldwide.",
                "category": "general"
            },
            {
                "id": "sky-sports-news",
                "description": "Watch the best live coverage of your favourite sports: Football, Golf, Rugby, Cricket, Tennis, F1, Boxing, plus the latest sports news, transfers and scores.",
                "category": "sport"
            },
            {
                "id": "spiegel-online",
                "description": "Deutschlands führende Nachrichtenseite. Alles Wichtige aus Politik, Wirtschaft, Sport, Kultur, Wissenschaft, Technik und mehr.",
                "category": "general"
            },
            {
                "id": "t3n",
                "description": "Das Online-Magazin bietet Artikel zu den Themen E-Business, Social Media, Startups und Webdesign.",
                "category": "technology"
            },
            {
                "id": "talksport",
                "description": "Tune in to the world\u0027s biggest sports radio station - Live Premier League football coverage, breaking sports news, transfer rumours \u0026amp; exclusive interviews.",
                "category": "sport"
            },
            {
                "id": "techcrunch",
                "description": "TechCrunch is a leading technology media property, dedicated to obsessively profiling startups, reviewing new Internet products, and breaking tech news.",
                "category": "technology"
            },
            {
                "id": "techradar",
                "description": "The latest technology news and reviews, covering computing, home entertainment systems, gadgets and more.",
                "category": "technology"
            },
            {
                "id": "the-economist",
                "description": "The Economist offers authoritative insight and opinion on international news, politics, business, finance, science, technology and the connections between them.",
                "category": "business"
            },
            {
                "id": "the-guardian-au",
                "description": "Latest news, sport, comment, analysis and reviews from Guardian Australia",
                "category": "general"
            },
            {
                "id": "the-guardian-uk",
                "description": "Latest news, sport, business, comment, analysis and reviews from the Guardian, the world's leading liberal voice.",
                "category": "general"
            },
            {
                "id": "the-hindu",
                "description": "The Hindu. latest news, analysis, comment, in-depth coverage of politics, business, sport, environment, cinema and arts from India\u0027s national newspaper.",
                "category": "general"
            },
            {
                "id": "the-huffington-post",
                "description": "The Huffington Post is a politically liberal American online news aggregator and blog that has both localized and international editions founded by Arianna Huffington, Kenneth Lerer, Andrew Breitbart, and Jonah Peretti, featuring columnists.",
                "category": "general"
            },
            {
                "id": "the-lad-bible",
                "description": "The LAD Bible is one of the largest community for guys aged 16-30 in the world. Send us your funniest pictures and videos!",
                "category": "entertainment"
            },
            {
                "id": "the-new-york-times",
                "description": "The New York Times: Find breaking news, multimedia, reviews opinion on Washington, business, sports, movies, travel, books, jobs, education, real estate, cars \u0026 more at nytimes.com.",
                "category": "general"
            },
            {
                "id": "the-next-web",
                "description": "The Next Web is one of the world’s largest online publications that delivers an international perspective on the latest news about Internet technology, business and culture.",
                "category": "technology"
            },
            {
                "id": "the-sport-bible",
                "description": "TheSPORTbible is one of the largest communities for sports fans across the world. Send us your sporting pictures and videos!",
                "category": "sport"
            },
            {
                "id": "the-telegraph",
                "description": "Latest news, business, sport, comment, lifestyle and culture from the Daily Telegraph and Sunday Telegraph newspapers and video from Telegraph TV.",
                "category": "general"
            },
            {
                "id": "the-times-of-india",
                "description": "Times of India brings the Latest News and Top Breaking headlines on Politics and Current Affairs in India and around the World, Sports, Business, Bollywood News and Entertainment, Science, Technology, Health and Fitness news, Cricket and opinions from leading columnists.",
                "category": "general"
            },
            {
                "id": "the-verge",
                "description": "The Verge covers the intersection of technology, science, art, and culture.",
                "category": "technology"
            },
            {
                "id": "the-wall-street-journal",
                "description": "WSJ online coverage of breaking news and current headlines from the US and around the world. Top stories, photos, videos, detailed analysis and in-depth reporting.",
                "category": "business"
            },
            {
                "id": "the-washington-post",
                "description": "Breaking news and analysis on politics, business, world national news, entertainment more. In-depth DC, Virginia, Maryland news coverage including traffic, weather, crime, education, restaurant reviews and more.",
                "category": "general"
            },
            {
                "id": "time",
                "description": "Breaking news and analysis from TIME.com. Politics, world news, photos, video, tech reviews, health, science and entertainment news.",
                "category": "general"
            },
            {
                "id": "usa-today",
                "description": "Get the latest national, international, and political news at USATODAY.com.",
                "category": "general"
            },
            {
                "id": "wired-de",
                "description": "Wired reports on how emerging technologies affect culture, the economy and politics.",
                "category": "technology"
            },
            {
                "id": "wirtschafts-woche",
                "description": "Das Online-Portal des führenden Wirtschaftsmagazins in Deutschland. Das Entscheidende zu Unternehmen, Finanzen, Erfolg und Technik.",
                "category": "business"
            }
        ];
        res.status(200);
        res.send(data);
    };

    return {
        getNews: getNews,
        getSources: getSources
    }
};

module.exports = newsController;
