// Celler (c) 2015 Krokodev
// Celler.App.Web
// Balance.cs

namespace Celler.App.Web.Game.Server.Config
{
    public static class Settings
    {
        public static class Loot
        {
            public static class Home
            {
                public const double Init = 1;
                public const double Max = 10;
            }

            public static class Food
            {
                public const double Min = 1;
                public const double Max = 10;
            }
        }

        public static class Dynamic
        {
            public static class Game
            {
                public const int UpdateInterval = 2;
            }

            public static class Food
            {
                public static class Ocscilation
                {
                    public const double MinPeriod = 10;
                    public const double MaxPeriod = 60;
                }

                public static class Creation
                {
                    public const int Interval = 2;
                    public const int MaxCount = 7;
                }
            }
        }

        public static class World
        {
            public const double Width = 720;
            public const double Height = 720;

            public static class Home
            {
                public const double Size = 150;
            }
            public static class Cell
            {
                public const double Size = 65;
            }
            public static class Sight
            {
                public const double Size = 100;
            }

            public static class Food
            {
                public const double MinSize = 5;
                public const double MaxSize = 100;
            }
        }
    }
}