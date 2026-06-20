<?php

namespace App\Filament\Resources\HeroSections\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class HeroSectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('badge_text'),
                TextInput::make('headline'),
                TextInput::make('highlighted_text'),
                Textarea::make('description')
                    ->columnSpanFull(),
                FileUpload::make('image_url')
                    ->image(),
                TextInput::make('doctor_name'),
                TextInput::make('doctor_title'),
                TextInput::make('primary_button_text'),
                TextInput::make('primary_button_link'),
                TextInput::make('secondary_button_text'),
                TextInput::make('secondary_button_link'),
                TextInput::make('stat_1_label'),
                TextInput::make('stat_1_value'),
                TextInput::make('stat_2_label'),
                TextInput::make('stat_2_value'),
                TextInput::make('stat_3_label'),
                TextInput::make('stat_3_value'),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
