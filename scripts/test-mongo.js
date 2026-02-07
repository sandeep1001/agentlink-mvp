#!/usr/bin/env node
/**
 * Test script to verify MongoDB storage implementation
 * Simulates production environment (USE_LOCAL_STORAGE=false)
 */

require('dotenv').config();

// Force MongoDB mode for testing
process.env.USE_LOCAL_STORAGE = 'false';

async function testMongoStorage() {
  console.log('🧪 Testing MongoDB Storage Implementation\n');
  
  try {
    // Load storage
    const storage = require('../models/storage');
    
    console.log('✓ Storage module loaded');
    console.log(`  Mode: ${process.env.USE_LOCAL_STORAGE === 'true' ? 'Local' : 'MongoDB'}`);
    
    // Test init
    console.log('\n1️⃣  Testing init()...');
    await storage.init();
    console.log('✓ Database connection successful');
    
    // Test getUsers
    console.log('\n2️⃣  Testing getUsers()...');
    const users = await storage.getUsers();
    console.log(`✓ Retrieved ${users.length} users`);
    
    // Test createUser
    console.log('\n3️⃣  Testing createUser()...');
    const testUser = await storage.createUser({
      name: 'Test Agent',
      email: `test-${Date.now()}@test.com`,
      description: 'Test description',
      skills: ['Testing', 'Automation']
    });
    console.log(`✓ Created user: ${testUser.name} (ID: ${testUser.id})`);
    
    // Test getUserById
    console.log('\n4️⃣  Testing getUserById()...');
    const foundUser = await storage.getUserById(testUser.id);
    console.log(`✓ Found user: ${foundUser.name}`);
    
    // Test getUserByEmail
    console.log('\n5️⃣  Testing getUserByEmail()...');
    const userByEmail = await storage.getUserByEmail(testUser.email);
    console.log(`✓ Found user by email: ${userByEmail.name}`);
    
    // Test updateUser
    console.log('\n6️⃣  Testing updateUser()...');
    const updatedUser = await storage.updateUser(testUser.id, {
      description: 'Updated description'
    });
    console.log(`✓ Updated user: ${updatedUser.name}`);
    
    // Test getGroups
    console.log('\n7️⃣  Testing getGroups()...');
    const groups = await storage.getGroups();
    console.log(`✓ Retrieved ${groups.length} groups`);
    
    // Test createGroup
    console.log('\n8️⃣  Testing createGroup()...');
    const testGroup = await storage.createGroup({
      name: 'Test Group',
      description: 'Test group description',
      creatorId: testUser.id,
      members: [testUser.id]
    });
    console.log(`✓ Created group: ${testGroup.name} (ID: ${testGroup.id})`);
    
    // Test joinGroup
    console.log('\n9️⃣  Testing joinGroup()...');
    const anotherUser = await storage.createUser({
      name: 'Another Test Agent',
      email: `test2-${Date.now()}@test.com`,
      description: 'Another test',
      skills: ['Testing']
    });
    const updatedGroup = await storage.joinGroup(testGroup.id, anotherUser.id);
    console.log(`✓ User joined group. Members: ${updatedGroup.members.length}`);
    
    // Test leaveGroup
    console.log('\n🔟 Testing leaveGroup()...');
    const leftGroup = await storage.leaveGroup(testGroup.id, anotherUser.id);
    console.log(`✓ User left group. Members: ${leftGroup.members.length}`);
    
    console.log('\n✅ All tests passed!\n');
    
    // Cleanup
    console.log('🧹 Cleaning up test data...');
    const User = require('../models/User');
    const Group = require('../models/Group');
    await User.deleteOne({ id: testUser.id });
    await User.deleteOne({ id: anotherUser.id });
    await Group.deleteOne({ id: testGroup.id });
    console.log('✓ Test data cleaned up');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testMongoStorage();
