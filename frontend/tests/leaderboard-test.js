/**
 * TEST SCRIPT - Leaderboard API
 * 
 * Script này giúp test API leaderboard mà không cần chơi game
 * Chạy trong Browser Console (F12) hoặc Node.js
 */

// ============================================
// TEST 1: Mock Data Generation
// ============================================

function generateMockGameData() {
  return {
    playerName: `Player_${Math.floor(Math.random() * 1000)}`,
    scores: {
      politics: Math.floor(Math.random() * 100),
      economy: Math.floor(Math.random() * 100),
      society: Math.floor(Math.random() * 100),
      diplomacy: Math.floor(Math.random() * 100)
    },
    get totalScore() {
      return this.scores.politics + this.scores.economy + 
             this.scores.society + this.scores.diplomacy;
    },
    completedAt: new Date().toISOString(),
    gameRounds: 16,
    openAnswers: []
  };
}

// ============================================
// TEST 2: Submit to API
// ============================================

async function testSubmitLeaderboard(apiUrl = 'http://localhost:3000') {
  const data = generateMockGameData();
  
  console.log('📤 Sending data:', data);
  
  try {
    const response = await fetch(`${apiUrl}/api/leaderboard/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    console.log('✅ Response:', result);
    console.log(`🏆 Rank: ${result.data?.rank} / ${result.data?.totalPlayers}`);
    
    return result;
  } catch (error) {
    console.error('❌ Error:', error);
    return null;
  }
}

// ============================================
// TEST 3: Get Leaderboard
// ============================================

async function testGetLeaderboard(apiUrl = 'http://localhost:3000', limit = 10) {
  console.log(`📋 Fetching top ${limit} players...`);
  
  try {
    const response = await fetch(`${apiUrl}/api/leaderboard?limit=${limit}`);
    const result = await response.json();
    
    console.log('✅ Leaderboard:', result);
    
    if (result.data && result.data.length > 0) {
      console.table(result.data.map((player, index) => ({
        Rank: index + 1,
        Name: player.playerName,
        'Total Score': player.totalScore,
        Politics: player.scores?.politics || player.politics_score,
        Economy: player.scores?.economy || player.economy_score,
        Society: player.scores?.society || player.society_score,
        Diplomacy: player.scores?.diplomacy || player.diplomacy_score
      })));
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error:', error);
    return null;
  }
}

// ============================================
// TEST 4: Batch Submit (Performance Test)
// ============================================

async function testBatchSubmit(apiUrl = 'http://localhost:3000', count = 10) {
  console.log(`🚀 Submitting ${count} test entries...`);
  
  const promises = [];
  for (let i = 0; i < count; i++) {
    promises.push(testSubmitLeaderboard(apiUrl));
  }
  
  const results = await Promise.all(promises);
  const successCount = results.filter(r => r?.success).length;
  
  console.log(`✅ Success: ${successCount}/${count}`);
  return results;
}

// ============================================
// TEST 5: Validation Test
// ============================================

async function testValidation(apiUrl = 'http://localhost:3000') {
  console.log('🧪 Testing validation...');
  
  const invalidData = [
    { name: 'Missing scores', data: { playerName: 'Test' } },
    { name: 'Invalid scores', data: { playerName: 'Test', scores: { politics: -10 } } },
    { name: 'Empty name', data: { playerName: '', scores: { politics: 50, economy: 50, society: 50, diplomacy: 50 }, totalScore: 200 } }
  ];

  for (const test of invalidData) {
    console.log(`\n📝 Testing: ${test.name}`);
    try {
      const response = await fetch(`${apiUrl}/api/leaderboard/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(test.data)
      });
      const result = await response.json();
      console.log(result.success ? '❌ Should fail' : '✅ Validation works', result);
    } catch (error) {
      console.log('✅ Caught error:', error.message);
    }
  }
}

// ============================================
// QUICK COMMANDS (Copy-paste vào Console)
// ============================================

console.log(`
╔════════════════════════════════════════╗
║   LEADERBOARD TEST COMMANDS            ║
╚════════════════════════════════════════╝

// 1. Test submit một entry
await testSubmitLeaderboard();

// 2. Test submit với custom API URL
await testSubmitLeaderboard('http://localhost:3000');

// 3. Xem top 10 leaderboard
await testGetLeaderboard();

// 4. Xem top 50
await testGetLeaderboard('http://localhost:3000', 50);

// 5. Test submit nhiều entries (performance)
await testBatchSubmit('http://localhost:3000', 20);

// 6. Test validation
await testValidation();

// 7. Generate mock data (không gửi)
const mockData = generateMockGameData();
console.log(mockData);

`);

// ============================================
// AUTO RUN (Uncomment để tự động chạy)
// ============================================

/*
(async () => {
  console.log('🚀 Starting auto tests...\n');
  
  // Test 1: Submit
  await testSubmitLeaderboard();
  
  // Test 2: Get leaderboard
  await testGetLeaderboard();
  
  console.log('\n✅ All tests completed!');
})();
*/

// Export cho Node.js (nếu cần)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateMockGameData,
    testSubmitLeaderboard,
    testGetLeaderboard,
    testBatchSubmit,
    testValidation
  };
}
