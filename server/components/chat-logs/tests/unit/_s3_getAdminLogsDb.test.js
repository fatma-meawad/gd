describe('Unit Tests for getAdminlogsDb with Filters', () => {
    test('Should return logs filtered by keyword', async () => {
      const options = { keyword: 'Edited' };
      const logs = await getAdminlogsDb(options);
      expect(logs).toEqual([
        {
          id: 1,
          action_type: 'edit',
          admin_id: 101,
          message_id: 201,
          action_time: '2023-11-10T10:30:00Z',
          details: 'Edited message content.',
        },
      ]);
    });
  
    test('Should return logs within a date range', async () => {
      const options = { date_range: '2023-11-10:2023-11-10' };
      const logs = await getAdminlogsDb(options);
      expect(logs).toEqual([
        {
          id: 1,
          action_type: 'edit',
          admin_id: 101,
          message_id: 201,
          action_time: '2023-11-10T10:30:00Z',
          details: 'Edited message content.',
        },
        {
          id: 2,
          action_type: 'create',
          admin_id: 102,
          message_id: 202,
          action_time: '2023-11-10T11:00:00Z',
          details: 'Created new message.',
        },
      ]);
    });
  });
  