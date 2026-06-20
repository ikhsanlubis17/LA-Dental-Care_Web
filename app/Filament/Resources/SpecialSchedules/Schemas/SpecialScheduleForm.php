<?php

namespace App\Filament\Resources\SpecialSchedules\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Schemas\Schema;

class SpecialScheduleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('doctor_id')
                    ->numeric(),
                DatePicker::make('date')
                    ->required(),
                TimePicker::make('start_time'),
                TimePicker::make('end_time'),
                Select::make('status')
                    ->options([
            'open' => 'Open',
            'closed' => 'Closed',
            'limited' => 'Limited',
            'leave' => 'Leave',
            'holiday' => 'Holiday',
        ])
                    ->default('closed')
                    ->required(),
                TextInput::make('note'),
            ]);
    }
}
