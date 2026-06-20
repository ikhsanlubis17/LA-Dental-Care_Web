<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('clinic_name'),
                TextInput::make('tagline'),
                TextInput::make('logo_url')
                    ->url(),
                TextInput::make('favicon_url')
                    ->url(),
                TextInput::make('primary_phone')
                    ->tel(),
                TextInput::make('whatsapp_number'),
                TextInput::make('email')
                    ->label('Email address')
                    ->email(),
                Textarea::make('address')
                    ->columnSpanFull(),
                Textarea::make('google_maps_url')
                    ->columnSpanFull(),
                Textarea::make('google_maps_embed')
                    ->columnSpanFull(),
                TextInput::make('instagram_url')
                    ->url(),
                TextInput::make('facebook_url')
                    ->url(),
                TextInput::make('tiktok_url')
                    ->url(),
                TextInput::make('youtube_url')
                    ->url(),
                Textarea::make('default_whatsapp_message')
                    ->columnSpanFull(),
                Textarea::make('business_hours_summary')
                    ->columnSpanFull(),
                TextInput::make('copyright_text'),
            ]);
    }
}
