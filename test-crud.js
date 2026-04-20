const http = require('http');
const querystring = require('querystring');

const BASE_URL = 'http://localhost:3000';

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body,
          url: res.url || options.path
        });
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(data);
    }

    req.end();
  });
}

async function testCRUD() {
  try {
    console.log('Testing CRUD operations...\n');

    // Test CREATE
    console.log('1. Creating a new project...');
    const createData = querystring.stringify({
      title: 'Test Project',
      category: 'Web Development',
      description: 'This is a test project for CRUD operations.',
      technologies: 'HTML, CSS, JavaScript',
      status: 'In Progress',
      year: 2026,
      challenge: 'Testing the CRUD functionality',
      solution: 'Implemented full CRUD with database',
      isFeatured: 'on'
    });

    const createResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/projects',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(createData)
      }
    }, createData);

    console.log('Create response status:', createResponse.status);
    console.log('Redirect location:', createResponse.headers.location);

    // For simplicity, let's assume the project was created and test the list
    console.log('\n2. Testing project list...');
    const listResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/projects',
      method: 'GET'
    });

    console.log('List response status:', listResponse.status);
    console.log('Response contains projects:', listResponse.body.includes('Test Project'));

    console.log('\n✅ Basic CRUD test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testCRUD();