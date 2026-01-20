import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { useAllMatches, useAllTeams, useAllGroups } from '@/hooks/useSportsData';
import { toast } from 'sonner';

type ExportType = 'matches' | 'teams' | 'groups';

export function DataExport() {
  const { data: matches } = useAllMatches();
  const { data: teams } = useAllTeams();
  const { data: groups } = useAllGroups();

  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');

  const getData = (type: ExportType) => {
    switch (type) {
      case 'matches':
        return matches || [];
      case 'teams':
        return teams || [];
      case 'groups':
        return groups || [];
    }
  };

  const convertToCSV = (data: any[]): string => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        // Escape quotes and wrap in quotes if contains comma
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = (type: ExportType) => {
    const data = getData(type);
    
    if (data.length === 0) {
      toast.error(`No ${type} data to export`);
      return;
    }

    const timestamp = new Date().toISOString().split('T')[0];
    
    if (exportFormat === 'json') {
      const content = JSON.stringify(data, null, 2);
      downloadFile(content, `${type}_backup_${timestamp}.json`, 'application/json');
    } else {
      const content = convertToCSV(data);
      downloadFile(content, `${type}_backup_${timestamp}.csv`, 'text/csv');
    }
    
    toast.success(`${type} exported successfully!`);
  };

  const handleExportAll = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    
    if (exportFormat === 'json') {
      const allData = {
        matches: matches || [],
        teams: teams || [],
        groups: groups || [],
        exportedAt: new Date().toISOString(),
      };
      const content = JSON.stringify(allData, null, 2);
      downloadFile(content, `full_backup_${timestamp}.json`, 'application/json');
    } else {
      // For CSV, export each as separate files in a zip-like approach (separate downloads)
      if (matches?.length) {
        downloadFile(convertToCSV(matches), `matches_backup_${timestamp}.csv`, 'text/csv');
      }
      if (teams?.length) {
        setTimeout(() => downloadFile(convertToCSV(teams), `teams_backup_${timestamp}.csv`, 'text/csv'), 100);
      }
      if (groups?.length) {
        setTimeout(() => downloadFile(convertToCSV(groups), `groups_backup_${timestamp}.csv`, 'text/csv'), 200);
      }
    }
    
    toast.success('Full backup exported!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={exportFormat} onValueChange={(v) => setExportFormat(v as 'json' | 'csv')}>
          <TabsList className="grid w-full max-w-xs grid-cols-2">
            <TabsTrigger value="json" className="flex items-center gap-2">
              <FileJson className="w-4 h-4" />
              JSON
            </TabsTrigger>
            <TabsTrigger value="csv" className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              CSV
            </TabsTrigger>
          </TabsList>

          <TabsContent value="json" className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Export data in JSON format. Best for complete backups and re-importing.
            </p>
          </TabsContent>

          <TabsContent value="csv" className="mt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Export data in CSV format. Best for viewing in spreadsheets like Excel.
            </p>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            onClick={() => handleExport('matches')}
            className="flex flex-col h-auto py-3 gap-1"
          >
            <span className="text-lg">📅</span>
            <span className="text-xs">Matches</span>
            <span className="text-xs text-muted-foreground">({matches?.length || 0})</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleExport('teams')}
            className="flex flex-col h-auto py-3 gap-1"
          >
            <span className="text-lg">👥</span>
            <span className="text-xs">Teams</span>
            <span className="text-xs text-muted-foreground">({teams?.length || 0})</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => handleExport('groups')}
            className="flex flex-col h-auto py-3 gap-1"
          >
            <span className="text-lg">🏆</span>
            <span className="text-xs">Groups</span>
            <span className="text-xs text-muted-foreground">({groups?.length || 0})</span>
          </Button>
          
          <Button 
            onClick={handleExportAll}
            className="flex flex-col h-auto py-3 gap-1"
          >
            <span className="text-lg">📦</span>
            <span className="text-xs">Export All</span>
            <span className="text-xs opacity-70">Full Backup</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
