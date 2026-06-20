<?php

namespace App\Filament\Resources\Doctors\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class DoctorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('title'),
                TextInput::make('photo_url')
                    ->url(),
                Textarea::make('description')
                    ->columnSpanFull(),
                Textarea::make('education')
                    ->columnSpanFull(),
                Textarea::make('experience')
                    ->columnSpanFull(),
                TextInput::make('specialization'),
                TextInput::make('license_number'),
                TextInput::make('whatsapp_number'),
                TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
