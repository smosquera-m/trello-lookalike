<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Column;
use App\Models\Task;
use Illuminate\Support\Facades\DB;

class BoardController extends Controller
{
    public function loadBoard()
    {
        $columns = Column::orderBy('order_index')->with(['tasks' => function ($q) {
            $q->orderBy('order_index');
        }])->get();

        $data = [
            'tasks' => (object)[],
            'columns' => (object)[],
            'columnOrder' => []
        ];

        foreach ($columns as $column) {
            $data['columnOrder'][] = $column->id;
            $data['columns'][$column->id] = [
                'id' => $column->id,
                'title' => $column->title,
                'taskIds' => []
            ];

            foreach ($column->tasks as $task) {
                $data['columns'][$column->id]['taskIds'][] = $task->id;
                $data['tasks'][$task->id] = [
                    'id' => $task->id,
                    'content' => $task->content
                ];
            }
        }

        if (empty($data['tasks'])) $data['tasks'] = (object)[];
        if (empty($data['columns'])) $data['columns'] = (object)[];

        // Seed some initial data if database is empty to match original project logic
        if (empty($data['columnOrder'])) {
            $col1 = 'column-1'; $col2 = 'column-2'; $col3 = 'column-3';
            Column::create(['id' => $col1, 'title' => 'To Do', 'order_index' => 0]);
            Column::create(['id' => $col2, 'title' => 'In Progress', 'order_index' => 1]);
            Column::create(['id' => $col3, 'title' => 'Done', 'order_index' => 2]);
            
            Task::create(['id' => 'task-1', 'content' => 'Explore the new Trello board', 'column_id' => $col1, 'order_index' => 0]);
            Task::create(['id' => 'task-2', 'content' => 'Try dragging cards between columns', 'column_id' => $col1, 'order_index' => 1]);
            Task::create(['id' => 'task-3', 'content' => 'Add a new task using the button below', 'column_id' => $col2, 'order_index' => 0]);
            Task::create(['id' => 'task-4', 'content' => 'Double click cards to edit (coming soon)', 'column_id' => $col3, 'order_index' => 0]);
            
            return $this->loadBoard(); // recursively reload after seeding
        }

        return response()->json($data);
    }

    public function addColumn(Request $request)
    {
        $request->validate(['id' => 'required', 'title' => 'required']);
        $maxOrder = Column::max('order_index') ?? -1;
        $column = Column::create([
            'id' => $request->id,
            'title' => $request->title,
            'order_index' => $maxOrder + 1
        ]);
        return response()->json($column);
    }

    public function addTask(Request $request)
    {
        $request->validate(['id' => 'required', 'column_id' => 'required', 'content' => 'required']);
        $maxOrder = Task::where('column_id', $request->column_id)->max('order_index') ?? -1;
        $task = Task::create([
            'id' => $request->id,
            'column_id' => $request->column_id,
            'content' => $request->content,
            'order_index' => $maxOrder + 1
        ]);
        return response()->json($task);
    }

    public function moveTask(Request $request)
    {
        $startColumnId = $request->startColumnId;
        $endColumnId = $request->endColumnId;
        $startIdx = $request->startIdx;
        $endIdx = $request->endIdx;
        $taskId = $request->taskId;

        DB::transaction(function () use ($startColumnId, $endColumnId, $taskId, $endIdx) {
            $task = Task::find($taskId);
            if (!$task) return;
            $task->update([
                'column_id' => $endColumnId,
                'order_index' => $endIdx
            ]);

            $endTasks = Task::where('column_id', $endColumnId)
                            ->where('id', '!=', $taskId)
                            ->orderBy('order_index')
                            ->get();

            $index = 0;
            foreach ($endTasks as $t) {
                if ($index == $endIdx) $index++;
                $t->update(['order_index' => $index]);
                $index++;
            }

            if ($startColumnId !== $endColumnId) {
                $startTasks = Task::where('column_id', $startColumnId)
                                  ->orderBy('order_index')
                                  ->get();
                $idx = 0;
                foreach ($startTasks as $st) {
                    $st->update(['order_index' => $idx]);
                    $idx++;
                }
            }
        });

        return response()->json(['success' => true]);
    }

    public function deleteTask($taskId)
    {
        Task::where('id', $taskId)->delete();
        return response()->json(['success' => true]);
    }
}
