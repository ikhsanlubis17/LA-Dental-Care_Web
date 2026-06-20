<?php

namespace App\Filament\Resources\Bookings\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TimePicker;
use Filament\Schemas\Schema;

class BookingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('patient_name')
                    ->required(),
                TextInput::make('whatsapp_number')
                    ->required(),
                TextInput::make('selected_service_id')
                    ->numeric(),
                TextInput::make('selected_service_name'),
                TextInput::make('selected_doctor_id')
                    ->numeric(),
                TextInput::make('selected_doctor_name'),
                DatePicker::make('booking_date'),
                TimePicker::make('booking_time'),
                Textarea::make('complaint')
                    ->columnSpanFull(),
                Select::make('status')
                    ->options([
            'new' => 'New',
            'processing' => 'Processing',
            'confirmed' => 'Confirmed',
            'completed' => 'Completed',
            'cancelled' => 'Cancelled',
            'no_show' => 'No show',
        ])
                    ->default('new')
                    ->required(),
                Textarea::make('admin_note')
                    ->columnSpanFull(),
            ]);
    }
}
