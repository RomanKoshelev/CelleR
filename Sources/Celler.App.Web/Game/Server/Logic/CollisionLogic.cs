// Celler (c) 2015 Krokodev
// Celler.App.Web
// CollisionLogic.cs

using System;
using System.Collections.Generic;
using System.Linq;
using Celler.App.Web.Game.Server.Entities;
using Celler.App.Web.Game.Server.Managers;

namespace Celler.App.Web.Game.Server.Logic
{
    public class CollisionLogic : ISublogic
    {
        private readonly IBodyManager _bodyManager;
        private IGameManager _game;

        public CollisionLogic( IGameManager game, IBodyManager bodyManager )
        {
            _game = game;
            _bodyManager = bodyManager;
        }

        public void Update()
        {
            CalcCollisions();
        }

        private void CalcCollisions()
        {
            var bodies = _bodyManager.GetBodies();
            var pairs = MakePairs( bodies ).ToList();

            pairs.ForEach( p => {
                if( Intersects( p.Item1, p.Item2) ) {
                    // Todo:> Rise event
                }
            } );
        }

        private static bool Intersects( IBody a, IBody b )
        {
            return ( Point.Distance( a.Position, b.Position ) < a.Size+b.Size);
        }

        private static IEnumerable< Tuple< IBody, IBody > > MakePairs( IList< IBody > bodies )
        {
            var pairs = bodies.SelectMany(
                ( value, index ) => bodies.Skip( index + 1 ),
                ( first, second ) => new Tuple< IBody, IBody >( first, second )
                );
            return pairs;
        }
    }
}