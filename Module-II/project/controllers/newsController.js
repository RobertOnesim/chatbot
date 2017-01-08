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
                "description": "general",
                "category": "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more."
            },
            {
                "id": "ars-technica",
                "description": "technology",
                "category": "The PC enthusiast's resource. Power users and the tools they love, without computing religion."
            },
            {
                "id": "associated-press",
                "description": "general",
                "category": "The AP delivers in-depth coverage on the international, politics, lifestyle, business, and entertainment news."
            },
            {
                "id": "bbc-news",
                "description": "general",
                "category": "Use BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. Also entertainment, business, science, technology and health news."
            },
            {
                "id": "bbc-sport",
                "description": "sport",
                "category": "The home of BBC Sport online. Includes live sports coverage, breaking news, results, video, audio and analysis on Football, F1, Cricket, Rugby Union, Rugby League, Golf, Tennis and all the main world sports, plus major events such as the Olympic Games."
            },
            {
                "id": "bild",
                "description": "general",
                "category": "Die Seite 1 für aktuelle Nachrichten und Themen, Bilder und Videos aus den Bereichen News, Wirtschaft, Politik, Show, Sport, und Promis."
            },
            {
                "id": "bloomberg",
                "description": "business",
                "category": "Bloomberg delivers business and markets news, data, analysis, and video to the world, featuring stories from Businessweek and Bloomberg News."
            },
            {
                "id": "business-insider",
                "description": "business",
                "category": "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web."
            },
            {
                "id": "business-insider-uk",
                "description": "business",
                "category": "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web."
            },
            {
                "id": "buzzfeed",
                "description": "entertainment",
                "category": "BuzzFeed is a cross-platform, global network for news and entertainment that generates seven billion views each month."
            },
            {
                "id": "cnbc",
                "description": "business",
                "category": "Get latest business news on stock markets, financial earnings on CNBC. View world markets streaming charts video; check stock tickers and quotes."
            },
            {
                "id": "cnn",
                "description": "general",
                "category": "View the latest news and breaking news today for U.S., world, weather, entertainment, politics and health at CNN"
            },
            {
                "id": "daily-mail",
                "description": "entertainment",
                "category": "All the latest news, sport, showbiz, science and health stories from around the world from the Daily Mail and Mail on Sunday newspapers."
            },
            {
                "id": "der-tagesspiegel",
                "description": "general",
                "category": "Nachrichten, News und neueste Meldungen aus dem Inland und dem Ausland - aktuell präsentiert von tagesspiegel.de."
            },
            {
                "id": "die-zeit",
                "description": "business",
                "category": "Aktuelle Nachrichten, Kommentare, Analysen und Hintergrundberichte aus Politik, Wirtschaft, Gesellschaft, Wissen, Kultur und Sport lesen Sie auf ZEIT ONLINE."
            },
            {
                "id": "engadget",
                "description": "technology",
                "category": "Engadget is a web magazine with obsessive daily coverage of everything new in gadgets and consumer electronics."
            },
            {
                "id": "entertainment-weekly",
                "description": "entertainment",
                "category": "Online version of the print magazine includes entertainment news, interviews, reviews of music, film, TV and books, and a special area for magazine subscribers."
            },
            {
                "id": "espn",
                "description": "sport",
                "category": "ESPN has up-to-the-minute sports news coverage, scores, highlights and commentary for NFL, MLB, NBA, College Football, NCAA Basketball and more."
            },
            {
                "id": "espn-cric-info",
                "description": "sport",
                "category": "ESPN Cricinfo provides the most comprehensive cricket coverage available including live ball-by-ball commentary, news, unparalleled statistics, quality editorial comment and analysis."
            },
            {
                "id": "financial-times",
                "description": "business",
                "category": "The latest UK and international business, finance, economic and political news, comment and analysis from the Financial Times on FT.com."
            },
            {
                "id": "focus",
                "description": "general",
                "category": "Minutenaktuelle Nachrichten und Service-Informationen von Deutschlands modernem Nachrichtenmagazin."
            },
            {
                "id": "football-italia",
                "description": "sport",
                "category": "Italian football news, analysis, fixtures and results for the latest from Serie A, Serie B and the Azzurri."
            },
            {
                "id": "fortune",
                "description": "business",
                "category": "Fortune 500 Daily and Breaking Business News"
            },
            {
                "id": "four-four-two",
                "description": "sport",
                "category": "The latest football news, in-depth features, tactical and statistical analysis from FourFourTwo, the UK's favourite football monthly."
            },
            {
                "id": "fox-sports",
                "description": "sport",
                "category": "Find live scores, player and team news, videos, rumors, stats, standings, schedules and fantasy games on FOX Sports."
            },
            {
                "id": "google-news",
                "description": "general",
                "category": "Comprehensive, up-to-date news coverage, aggregated from sources all over the world by Google News."
            },
            {
                "id": "gruenderszene",
                "description": "technology",
                "category": "Online-Magazin für Startups und die digitale Wirtschaft. News und Hintergründe zu Investment, VC und Gründungen."
            },
            {
                "id": "hacker-news",
                "description": "technology",
                "category": "Hacker News is a social news website focusing on computer science and entrepreneurship. It is run by Paul Graham's investment fund and startup incubator, Y Combinator. In general, content that can be submitted is defined as \"anything that gratifies one\u0027s intellectual curiosity\"."
            },
            {
                "id": "handelsblatt",
                "description": "business",
                "category": "Auf Handelsblatt lesen sie Nachrichten über Unternehmen, Finanzen, Politik und Technik. Verwalten Sie Ihre Finanzanlagen mit Hilfe unserer Börsenkurse."
            },
            {
                "id": "ign",
                "description": "gaming",
                "category": "IGN is your site for Xbox One, PS4, PC, Wii-U, Xbox 360, PS3, Wii, 3DS, PS Vita and iPhone games with expert reviews, news, previews, trailers, cheat codes, wiki guides and walkthroughs."
            },
            {
                "id": "independent",
                "description": "general",
                "category": "National morning quality (tabloid) includes free online access to news and supplements. Insight by Robert Fisk and various other columnists."
            },
            {
                "id": "mashable",
                "description": "entertainment",
                "category": "Mashable is a global, multi-platform media and entertainment company."
            },
            {
                "id": "metro",
                "description": "general",
                "category": "News, Sport, Showbiz, Celebrities from Metro - a free British newspaper."
            },
            {
                "id": "mirror",
                "description": "general",
                "category": "All the latest news, sport and celebrity gossip at Mirror.co.uk. Get all the big headlines, pictures, analysis, opinion and video on the stories that matter to you."
            },
            {
                "id": "mtv-news",
                "description": "music",
                "category": "The ultimate news source for music, celebrity, entertainment, movies, and current events on the web. It's pop culture on steroids."
            },
            {
                "id": "mtv-news-uk",
                "description": "music",
                "category": "All the latest celebrity news, gossip, exclusive interviews and pictures from the world of music and entertainment."
            },
            {
                "id": "national-geographic",
                "description": "science-and-nature",
                "category": "Reporting our world daily: original nature and science news from National Geographic."
            },
            {
                "id": "new-scientist",
                "description": "science-and-nature",
                "category": "Breaking science and technology news from around the world. Exclusive stories and expert analysis on space, technology, health, physics, life and Earth."
            },
            {
                "id": "newsweek",
                "description": "general",
                "category": "Newsweek provides in-depth analysis, news and opinion about international issues, technology, business, culture and politics."
            },
            {
                "id": "new-york-magazine",
                "description": "general",
                "category": "NYMAG and New York magazine cover the new, the undiscovered, the next in politics, culture, food, fashion, and behavior nationally, through a New York lens."
            },
            {
                "id": "nfl-news",
                "description": "sport",
                "category": "The official source for NFL news, schedules, stats, scores and more."
            },
            {
                "id": "polygon",
                "description": "gaming",
                "category": "Polygon is a gaming website in partnership with Vox Media. Our culture focused site covers games, their creators, the fans, trending stories and entertainment news."
            },
            {
                "id": "recode",
                "description": "technology",
                "category": "Get the latest independent tech news, reviews and analysis from Recode with the most informed and respected journalists in technology and media."
            },
            {
                "id": "reddit-r-all",
                "description": "general",
                "category": "Reddit is an entertainment, social news networking service, and news website. Reddit's registered community members can submit content, such as text posts or direct links."
            },
            {
                "id": "reuters",
                "description": "general",
                "category": "Reuters.com brings you the latest news from around the world, covering breaking news in business, politics, entertainment, technology, video and pictures."
            },
            {
                "id": "sky-news",
                "description": "general",
                "category": "Sky news delivers breaking news, headlines and top stories from business, politics, entertainment and more in the UK and worldwide."
            },
            {
                "id": "sky-sports-news",
                "description": "sport",
                "category": "Watch the best live coverage of your favourite sports: Football, Golf, Rugby, Cricket, Tennis, F1, Boxing, plus the latest sports news, transfers and scores."
            },
            {
                "id": "spiegel-online",
                "description": "general",
                "category": "Deutschlands führende Nachrichtenseite. Alles Wichtige aus Politik, Wirtschaft, Sport, Kultur, Wissenschaft, Technik und mehr."
            },
            {
                "id": "t3n",
                "description": "technology",
                "category": "Das Online-Magazin bietet Artikel zu den Themen E-Business, Social Media, Startups und Webdesign."
            },
            {
                "id": "talksport",
                "description": "sport",
                "category": "Tune in to the world's biggest sports radio station - Live Premier League football coverage, breaking sports news, transfer rumours \u0026amp; exclusive interviews."
            },
            {
                "id": "techcrunch",
                "description": "technology",
                "category": "TechCrunch is a leading technology media property, dedicated to obsessively profiling startups, reviewing new Internet products, and breaking tech news."
            },
            {
                "id": "techradar",
                "description": "technology",
                "category": "The latest technology news and reviews, covering computing, home entertainment systems, gadgets and more."
            },
            {
                "id": "the-economist",
                "description": "business",
                "category": "The Economist offers authoritative insight and opinion on international news, politics, business, finance, science, technology and the connections between them."
            },
            {
                "id": "the-guardian-au",
                "description": "general",
                "category": "Latest news, sport, comment, analysis and reviews from Guardian Australia"
            },
            {
                "id": "the-guardian-uk",
                "description": "general",
                "category": "Latest news, sport, business, comment, analysis and reviews from the Guardian, the world's leading liberal voice."
            },
            {
                "id": "the-hindu",
                "description": "general",
                "category": "The Hindu. latest news, analysis, comment, in-depth coverage of politics, business, sport, environment, cinema and arts from India\u0027s national newspaper."
            },
            {
                "id": "the-huffington-post",
                "description": "general",
                "category": "The Huffington Post is a politically liberal American online news aggregator and blog that has both localized and international editions founded by Arianna Huffington, Kenneth Lerer, Andrew Breitbart, and Jonah Peretti, featuring columnists."
            },
            {
                "id": "the-lad-bible",
                "description": "entertainment",
                "category": "The LAD Bible is one of the largest community for guys aged 16-30 in the world. Send us your funniest pictures and videos!"
            },
            {
                "id": "the-new-york-times",
                "description": "general",
                "category": "The New York Times: Find breaking news, multimedia, reviews ' opinion on Washington, business, sports, movies, travel, books, jobs, education, real estate, cars \u0026 more at nytimes.com."
            },
            {
                "id": "the-next-web",
                "description": "technology",
                "category": "The Next Web is one of the world’s largest online publications that delivers an international perspective on the latest news about Internet technology, business and culture."
            },
            {
                "id": "the-sport-bible",
                "description": "sport",
                "category": "TheSPORTbible is one of the largest communities for sports fans across the world. Send us your sporting pictures and videos!"
            },
            {
                "id": "the-telegraph",
                "description": "general",
                "category": "Latest news, business, sport, comment, lifestyle and culture from the Daily Telegraph and Sunday Telegraph newspapers and video from Telegraph TV."
            },
            {
                "id": "the-times-of-india",
                "description": "general",
                "category": "Times of India brings the Latest News and Top Breaking headlines on Politics and Current Affairs in India and around the World, Sports, Business, Bollywood News and Entertainment, Science, Technology, Health and Fitness news, Cricket and opinions from leading columnists."
            },
            {
                "id": "the-verge",
                "description": "technology",
                "category": "The Verge covers the intersection of technology, science, art, and culture."
            },
            {
                "id": "the-wall-street-journal",
                "description": "business",
                "category": "WSJ online coverage of breaking news and current headlines from the US and around the world. Top stories, photos, videos, detailed analysis and in-depth reporting."
            },
            {
                "id": "the-washington-post",
                "description": "general",
                "category": "Breaking news and analysis on politics, business, world national news, entertainment more. In-depth DC, Virginia, Maryland news coverage including traffic, weather, crime, education, restaurant reviews and more."
            },
            {
                "id": "time",
                "description": "general",
                "category": "Breaking news and analysis from TIME.com. Politics, world news, photos, video, tech reviews, health, science and entertainment news."
            },
            {
                "id": "usa-today",
                "description": "general",
                "category": "Get the latest national, international, and political news at USATODAY.com."
            },
            {
                "id": "wired-de",
                "description": "technology",
                "category": "Wired reports on how emerging technologies affect culture, the economy and politics."
            },
            {
                "id": "wirtschafts-woche",
                "description": "business",
                "category": "Das Online-Portal des führenden Wirtschaftsmagazins in Deutschland. Das Entscheidende zu Unternehmen, Finanzen, Erfolg und Technik."
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
