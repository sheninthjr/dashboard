import express from 'express';
import cheerio from 'cheerio';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.use(express());
app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Worker is working successfully');
});

async function request(url: string) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url,
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'max-age=0',
      cookie:
        'gr_user_id=27e20f9b-3776-4019-9b3e-56a11b5caa51; _gid=GA1.2.1329190283.1718120361; cf_clearance=N_92.wPrg73_E2GAzgVW6ywy4I2kbxT3ahNuNLcGzuU-1718120407-1.0.1.1-7xbNdk7_A3KU8VMCd4ZkKXcJjvdqvWlWLfn6GGnz9THiAURUP9uw1XbrXU41Se4kllVUZqtoq5By2z9qxiiHzQ; csrftoken=tiNw7qQQwkkYrhWmU81eJvJpSkwzbfpqyyk9Oa7P3cnTstmzpZXL5VTYQZk694cr; __stripe_mid=50f6bc7a-dfd1-44bf-b82e-ba23995bc71e4bd9ef; 87b5a3c3f1a55520_gr_last_sent_cs1=sheninthjr; INGRESSCOOKIE=feb7923b3939a3900f00a233340d7dd2|8e0876c7c1464cc0ac96bc2edceabd27; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiOTIyNTI2NSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiN2Y1Y2I2NWM5NTNlNDY5ZDY5NTczZGI5MTQ5ZDIyZmYxM2Y4MDg2MDNiOWY1MGEwN2MxOTQxYTEwZGNmNDQ1NCIsImlkIjo5MjI1MjY1LCJlbWFpbCI6InNoZW5pbnRoanIyM0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6InNoZW5pbnRoanIiLCJ1c2VyX3NsdWciOiJzaGVuaW50aGpyIiwiYXZhdGFyIjoiaHR0cHM6Ly9hc3NldHMubGVldGNvZGUuY29tL3VzZXJzL2F2YXRhcnMvYXZhdGFyXzE2ODUyNjU3NDUucG5nIiwicmVmcmVzaGVkX2F0IjoxNzE4MjA3NTEzLCJpcCI6IjI0MDI6M2E4MDo1MWE6ZTA5Zjo0ODk1OmZhNWQ6YzQ5MDoxNjUyIiwiaWRlbnRpdHkiOiJkNzI2OTA4MDZlMDVhYjEwODQxMmVlMzNiNGM1YzNlMSIsInNlc3Npb25faWQiOjYzMzY1NjA0LCJfc2Vzc2lvbl9leHBpcnkiOjEyMDk2MDB9.3629-UVNCb9CtvYPIMYl6Isekz3cch-H5cdYHQMcNQ4; 87b5a3c3f1a55520_gr_session_id=143901c1-61ed-4f0a-9a03-0fe74cdcb541; 87b5a3c3f1a55520_gr_last_sent_sid_with_cs1=143901c1-61ed-4f0a-9a03-0fe74cdcb541; 87b5a3c3f1a55520_gr_session_id_sent_vst=143901c1-61ed-4f0a-9a03-0fe74cdcb541; __cf_bm=Gb3GzYQUYGrivFLHX9qecMmcC0EVoa_cwrGMbYekzmo-1718221039-1.0.1.1-hYCtQWDI7q7iIfFHlBETWQnm8Q4xqFu6_zPwDYNk8YE0PjKP0zN_j0NMcGCBWxBdyXEp6Qx.6bK4kKpd1rt4GQ; _ga=GA1.1.98186716.1718120356; 87b5a3c3f1a55520_gr_cs1=sheninthjr; __gads=ID=4fe5c10d362c5f09:T=1718120486:RT=1718221638:S=ALNI_MYyOlnp2YLBo7gTidc2XIU0ENneOw; __gpi=UID=00000e4822173d7b:T=1718120486:RT=1718221638:S=ALNI_MZLY8zHcBW0ibSzY0RtxyL1a6pppw; __eoi=ID=ef77b49d0dc163f6:T=1718120486:RT=1718221638:S=AA-AfjaeLvatB5qgm0Xlabcgk9C8; _ga_CDRWKZTDEX=GS1.1.1718220055.5.1.1718221638.60.0.0; FCNEC=%5B%5B%22AKsRol9NzSIZar766K54ZmKD8Km-AELS10VnuZRWT_QqtkeUd_P1p24CK3-Ydqz0sflhqzT9rVkq1zJtR-rPyiBC5pkFvQhnoKyKgGTICOX2B7eG5dFFAdTadTXWIBoRiz3mGvnMcb1HEU_OQGaopeumUAMJzYssnQ%3D%3D%22%5D%5D',
      priority: 'u=0, i',
      referer: 'https://leetcode.com/problemset/',
      'sec-ch-ua':
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    },
  };

  const data = axios.request(config);
  console.log(data);
  return data;
}

app.get('/submission', async (req, res) => {
  const { username, leetcode_url } = req.body;
  try {
    request(leetcode_url);
    // const { data: htmlPage } = await request(leetcode_url);
    // const $ = cheerio.load(htmlPage);
    // const userSelector = 'a.no-underline.text-sm.overflow-hidden.max-w-[100px].md\\:max-w-[200px].hover\\:text-blue-s.dark\\:hover\\:text-dark-blue-s.truncate.font-normal.text-text-primary.dark\\:text-text-primary';
    // const userName = $(userSelector).text().trim();
    // const userSubmitted = userName === username;
    // res.json({ username, userName, submitted: userSubmitted });
  } catch (error) {
    console.error('Error fetching LeetCode URL:', error);
    res.status(500).send('An error occurred while fetching the LeetCode URL');
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on the port ${PORT}`);
});
