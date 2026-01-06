'use client';

import type { ReactNode } from 'react';

import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { getUserGroups } from 'src/lib/database';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export type GroupContextValue = {
  groups: Array<{
    id: string;
    name: string;
    created_at: string | null;
    description: string | null;
  }>;
  selectedGroup: {
    id: string;
    name: string;
    created_at: string | null;
    description: string | null;
  } | null;
  setSelectedGroup: (group: GroupContextValue['selectedGroup']) => void;
  loading: boolean;
};

export const GroupContext = createContext<GroupContextValue | undefined>(undefined);

export const useGroupContext = () => {
  const context = useContext(GroupContext);

  if (!context) {
    throw new Error('useGroupContext must be used within GroupProvider');
  }

  return context;
};

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export function GroupProvider({ children }: Props) {
  const { user } = useAuthContext();
  const [groups, setGroups] = useState<GroupContextValue['groups']>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupContextValue['selectedGroup']>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user's groups
  useEffect(() => {
    const fetchGroups = async () => {
      if (!user?.id) {
        setGroups([]);
        setSelectedGroup(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const groupMembers = await getUserGroups(user.id);
        const userGroups = groupMembers.map((gm: any) => gm.group).filter(Boolean);
        
        setGroups(userGroups);
        
        // Load selected group from localStorage or default to first group
        const savedGroupId = localStorage.getItem('selectedGroupId');
        const defaultGroup = savedGroupId 
          ? userGroups.find((g: any) => g.id === savedGroupId) || userGroups[0]
          : userGroups[0];
        
        setSelectedGroup(defaultGroup || null);
      } catch (error) {
        console.error('Error fetching groups:', error);
        setGroups([]);
        setSelectedGroup(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [user?.id]);

  // Save selected group to localStorage when it changes
  const handleSetSelectedGroup = useCallback((group: GroupContextValue['selectedGroup']) => {
    setSelectedGroup(group);
    if (group) {
      localStorage.setItem('selectedGroupId', group.id);
    } else {
      localStorage.removeItem('selectedGroupId');
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({
      groups,
      selectedGroup,
      setSelectedGroup: handleSetSelectedGroup,
      loading,
    }),
    [groups, selectedGroup, handleSetSelectedGroup, loading]
  );

  return <GroupContext.Provider value={memoizedValue}>{children}</GroupContext.Provider>;
}
