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
    public class CollisionLogic : IAuxLogic, ICollisionLogic
    {


        #region Constructor

        public CollisionLogic( ITimeLogic game, IBodyManager bodyManager )
        {
            _game = game;
            _bodyManager = bodyManager;
        }

        #endregion


        #region Events

        public event Action< IBody, IBody > onCollision = ( a, b ) => { };

        #endregion


        #region IAuxLogic

        void IAuxLogic.Update()
        {
            ProcCollisions();
        }

        #endregion




        #region Private Fields

        private readonly IBodyManager _bodyManager;
        private ITimeLogic _game;

        #endregion


        #region Private Methods

        private void ProcCollisions()
        {
            var bodies = _bodyManager.GetBodies();
            var pairs = MakePairs( bodies ).ToList();

            pairs.ForEach( p => {
                var a = p.Item1;
                var b = p.Item2;
                if( Intersects( a, b ) ) {
                    onCollision( a, b );
                }
            } );
        }

        private static bool Intersects( IBody a, IBody b )
        {
            return ( Point.Distance( a.Position, b.Position ) < a.Size + b.Size );
        }

        private static IEnumerable< Tuple< IBody, IBody > > MakePairs( IList< IBody > bodies )
        {
            var pairs = bodies.SelectMany(
                ( value, index ) => bodies.Skip( index + 1 ),
                ( first, second ) => new Tuple< IBody, IBody >( first, second )
                );
            return pairs;
        }

        #endregion

   }
}